# Stärke Parts — Landing Page React

Versão completa construída sobre a estética da primeira proposta do projeto: visual institucional premium, fundo escuro, amarelo Stärke como destaque e componentes limpos, agora com todo o conteúdo institucional e comercial ampliado.

## Formulário Trabalhe conosco

O formulário da página `/trabalhe-conosco`, acessível pelo rodapé, envia currículos para `departamentopessoal@starkeparts.com` pela API da Resend. Configure `RESEND_API_KEY` e `CAREERS_FROM_EMAIL` no ambiente de produção. O remetente precisa pertencer a um domínio verificado na Resend. Para desenvolvimento local, use um arquivo `.env.local` não versionado.

Sem essas duas variáveis, o formulário informa que o envio está indisponível. São aceitos PDF, DOC e DOCX de até 5 MB.

## Stack
- React
- Vite
- HTML5
- CSS3
- JavaScript
- Lucide React

## Conteúdo incluído
- Hero institucional
- História e timeline 2016–2026
- Posicionamento de marca
- Especialização em veículos premium/importados
- Marcas e parceiros globais
- 11 linhas de produtos
- Diferenciais
- Logística
- Matriz, CD e filiais
- Públicos atendidos
- CTA de atendimento

## Rodar localmente
```bash
npm install
npm run dev
```

## Personalização necessária
No arquivo `src/App.jsx`:
- substitua `WHATSAPP_NUMBER` pelo número oficial com DDI + DDD;
- ajuste o Instagram se necessário;
- quando disponível, substitua `BrandMark` pelo logo oficial em SVG.

## Paleta
- Amarelo: `#fccc2c`
- Preto: `#040404`
- Vermelho: `#e42434`
