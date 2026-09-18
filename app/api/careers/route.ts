import { Buffer } from "node:buffer";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const RH_EMAIL = "departamentopessoal@starkeparts.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedTypes: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

function hasValidSignature(extension: string, bytes: Uint8Array): boolean {
  if (extension === "pdf") return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === "%PDF-";
  if (extension === "doc") return bytes.length >= 8 && [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1].every((byte, index) => bytes[index] === byte);
  if (extension === "docx") return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04;
  return false;
}

export async function POST(request: Request) {
  const configured = process.env.RESEND_API_KEY && process.env.CAREERS_FROM_EMAIL;
  if (!configured) return Response.json({ error: "O envio de currículos ainda não está disponível." }, { status: 503 });

  const contentLength = Number(request.headers.get("content-length"));
  if (contentLength > MAX_FILE_SIZE + 20_000) return Response.json({ error: "O arquivo deve ter até 5 MB." }, { status: 413 });

  let form: FormData;
  try { form = await request.formData(); }
  catch { return Response.json({ error: "Não foi possível ler o formulário." }, { status: 400 }); }

  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const area = String(form.get("area") ?? "").trim();
  const consent = form.get("consent") === "on";
  const file = form.get("resume");
  if (name.length < 2 || name.length > 120 || !emailPattern.test(email) || email.length > 254 || phone.length > 40 || area.length > 120 || !consent || !(file instanceof File)) {
    return Response.json({ error: "Confira os dados obrigatórios do formulário." }, { status: 400 });
  }
  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!allowedTypes[extension] || file.type !== allowedTypes[extension] || file.size === 0 || file.size > MAX_FILE_SIZE) {
    return Response.json({ error: "Envie um currículo em PDF, DOC ou DOCX de até 5 MB." }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 100);
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (!hasValidSignature(extension, bytes)) {
    return Response.json({ error: "O conteúdo do currículo não corresponde ao formato informado." }, { status: 400 });
  }
  const content = Buffer.from(bytes).toString("base64");
  const result = await fetch("https://api.resend.com/emails", {
    method: "POST",
    signal: AbortSignal.timeout(15_000),
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CAREERS_FROM_EMAIL,
      to: [RH_EMAIL],
      reply_to: email,
      subject: `Candidatura pelo site: ${name.replace(/[\r\n]/g, " ")}`,
      text: `Nova candidatura pelo site Stärke Parts\n\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone || "Não informado"}\nÁrea de interesse: ${area || "Não informada"}\n\nO candidato consentiu com o envio dos dados para avaliação da candidatura.`,
      attachments: [{ filename: safeName, content }],
    }),
  }).catch(() => null);

  if (!result?.ok) return Response.json({ error: "Não foi possível enviar o currículo. Tente novamente mais tarde." }, { status: 502 });
  return Response.json({ ok: true });
}
