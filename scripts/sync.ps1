param([switch]$NoInstall)

$ErrorActionPreference = "Stop"

function Invoke-Git {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Arguments)
  & git @Arguments
  if ($LASTEXITCODE -ne 0) { throw "Falha ao executar: git $($Arguments -join ' ')" }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw "Git não foi encontrado no PATH." }
$repositoryRoot = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $repositoryRoot) { throw "Execute este script dentro do repositório." }
Set-Location -LiteralPath $repositoryRoot

$gitDirectory = (& git rev-parse --git-dir).Trim()
foreach ($operation in @("MERGE_HEAD", "CHERRY_PICK_HEAD", "REVERT_HEAD")) {
  if (Test-Path -LiteralPath (Join-Path $gitDirectory $operation)) {
    throw "Existe uma operação Git interrompida ($operation). Resolva ou aborte antes de sincronizar."
  }
}
if ((Test-Path -LiteralPath (Join-Path $gitDirectory "rebase-merge")) -or (Test-Path -LiteralPath (Join-Path $gitDirectory "rebase-apply"))) {
  throw "Existe um rebase interrompido. Resolva ou execute git rebase --abort antes de sincronizar."
}

$branch = (& git branch --show-current).Trim()
if (-not $branch) { throw "Selecione uma branch antes de sincronizar." }
$hasLocalChanges = [bool](& git status --porcelain)
$stashCreated = $false
$stashLabel = "sync-auto-$([DateTime]::Now.ToString('yyyyMMdd-HHmmss'))"

try {
  if ($hasLocalChanges) {
    Write-Host "Guardando alterações locais temporariamente..." -ForegroundColor Yellow
    Invoke-Git stash push --include-untracked --message $stashLabel
    $stashCreated = $true
  }
  Write-Host "Buscando atualizações do remoto..." -ForegroundColor Cyan
  Invoke-Git fetch --prune origin
  Write-Host "Atualizando $branch com rebase..." -ForegroundColor Cyan
  Invoke-Git pull --rebase origin $branch
  if (-not $NoInstall -and (Test-Path -LiteralPath "package-lock.json")) {
    Write-Host "Sincronizando dependências..." -ForegroundColor Cyan
    & npm install
    if ($LASTEXITCODE -ne 0) { throw "O código foi atualizado, mas npm install falhou." }
  }
}
catch {
  if ((Test-Path -LiteralPath (Join-Path $gitDirectory "rebase-merge")) -or (Test-Path -LiteralPath (Join-Path $gitDirectory "rebase-apply"))) { & git rebase --abort }
  throw
}
finally {
  if ($stashCreated) {
    Write-Host "Restaurando alterações locais..." -ForegroundColor Yellow
    & git stash pop
    if ($LASTEXITCODE -ne 0) { Write-Warning "Houve conflito ao restaurar alterações. O backup permanece em git stash list." }
  }
}

Write-Host "Sincronização concluída com sucesso." -ForegroundColor Green
git status --short --branch
