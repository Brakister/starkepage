"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "../i18n";

function CareersContent() {
  const { lang, setLanguage } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("resume");
    if (!(file instanceof File) || file.size > 5 * 1024 * 1024) {
      setStatus("error");
      setMessage(lang === "pt" ? "O currículo deve ter até 5 MB." : "Your résumé must be under 5 MB.");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("/api/careers", { method: "POST", body: data });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Falha no envio.");
      form.reset();
      setStatus("sent");
      setMessage(lang === "pt" ? "Currículo enviado com sucesso." : "Résumé sent successfully.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Falha no envio.");
    }
  }

  return <main className="careers-page">
    <header className="careers-page__header">
      <Link href="/" aria-label="Stärke Parts"><img src="/starke-parts-logo.png" alt="Stärke Parts" /></Link>
      <div><Link href="/">{lang === "pt" ? "Voltar ao site" : "Back to site"} ↗</Link><div className="careers-page__language" role="group" aria-label={lang === "pt" ? "Idioma" : "Language"}><button type="button" aria-pressed={lang === "pt"} onClick={() => setLanguage("pt")}>PT</button><button type="button" aria-pressed={lang === "en"} onClick={() => setLanguage("en")}>EN</button></div></div>
    </header>
    <section className="careers-section" aria-labelledby="careers-title">
      <div><span className="careers-section__eyebrow">{lang === "pt" ? "CARREIRAS" : "CAREERS"}</span><h1 id="careers-title">{lang === "pt" ? "Trabalhe conosco" : "Work with us"}</h1><p>{lang === "pt" ? "Quer fazer parte da Stärke Parts? Envie seus dados e currículo diretamente para nossa equipe de RH." : "Want to join Stärke Parts? Send your details and résumé directly to our HR team."}</p></div>
      <form onSubmit={submit} encType="multipart/form-data">
        <label>{lang === "pt" ? "Nome completo" : "Full name"}<input name="name" type="text" required maxLength={120} autoComplete="name" /></label>
        <label>{lang === "pt" ? "E-mail" : "Email"}<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
        <label>{lang === "pt" ? "Telefone (opcional)" : "Phone (optional)"}<input name="phone" type="tel" maxLength={40} autoComplete="tel" /></label>
        <label>{lang === "pt" ? "Área de interesse (opcional)" : "Area of interest (optional)"}<input name="area" type="text" maxLength={120} /></label>
        <label className="careers-section__file">{lang === "pt" ? "Currículo (PDF, DOC ou DOCX, até 5 MB)" : "Résumé (PDF, DOC or DOCX, up to 5 MB)"}<input name="resume" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" required /></label>
        <label className="careers-section__consent"><input name="consent" type="checkbox" required /><span>{lang === "pt" ? "Autorizo o envio dos meus dados e currículo à equipe de RH para avaliação da candidatura." : "I agree to send my details and résumé to the HR team for evaluation of my application."}</span></label>
        <button type="submit" disabled={status === "sending"}>{status === "sending" ? (lang === "pt" ? "Enviando..." : "Sending...") : (lang === "pt" ? "Enviar currículo" : "Send résumé")}</button>
        {message && <p className={status === "sent" ? "careers-section__success" : "careers-section__error"} role="status">{message}</p>}
      </form>
    </section>
    <footer className="careers-page__footer">© {new Date().getFullYear()} Stärke Parts</footer>
  </main>;
}

export default function CareersPageContent() {
  return <LanguageProvider><CareersContent /></LanguageProvider>;
}
