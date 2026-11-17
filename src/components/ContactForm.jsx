import { useState } from 'react';
import { profile } from '../config/profile.js';
import { Arrow } from './ui.jsx';

const subjects = ['Projet de sécurité', 'Collaboration', 'Opportunité', 'Autre'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const field =
  'peer w-full border-b bg-transparent pb-3 pt-7 font-display text-lg text-bone outline-none transition-colors duration-300 placeholder:text-transparent focus:border-accent sm:text-xl';
const label =
  'pointer-events-none absolute left-0 top-7 font-display text-lg text-mist-dim transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.2em] sm:text-xl';

function validate(f) {
  const e = {};
  if (!f.name.trim()) e.name = 'Indiquez votre nom.';
  if (!EMAIL_RE.test(f.email.trim())) e.email = 'Indiquez une adresse e-mail valide.';
  if (f.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.';
  return e;
}

/**
 * Envoi : 1) vers `profile.contactForm.endpoint` (Formspree…) s'il est renseigné ;
 * 2) sinon ouverture de la messagerie du visiteur vers `profile.contact.email` ;
 * 3) sinon message indiquant que l'envoi n'est pas encore actif.
 */
export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: subjects[0], message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | unconfigured | error
  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const { endpoint } = profile.contactForm;
    const { email } = profile.contact;

    if (endpoint) {
      setStatus('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        setForm({ name: '', email: '', subject: subjects[0], message: '' });
      } catch {
        setStatus('error');
      }
      return;
    }
    if (email) {
      const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(`${form.subject} — ${form.name}`)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }
    setStatus('unconfigured');
  };

  const messages = {
    idle: 'Tous les champs sont nécessaires.',
    sending: 'Envoi en cours…',
    sent: 'Merci, votre message a bien été envoyé.',
    mailto: 'Votre messagerie s’ouvre avec le message prêt à envoyer.',
    error: 'L’envoi a échoué. Merci de réessayer plus tard.',
    unconfigured: 'L’envoi du formulaire n’est pas encore activé. Les coordonnées seront bientôt disponibles.',
  };
  const border = (k) => (errors[k] ? 'border-accent' : 'border-bone/25');

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-[2rem] border border-bone/10 bg-ink/80 p-7 text-bone backdrop-blur-md sm:p-12">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Écrivez-moi<span className="text-accent">.</span></h3>
        <span className="eyebrow text-accent">( Formulaire )</span>
      </div>

      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <Field id="name" error={errors.name}>
          <input id="cf-name" type="text" autoComplete="name" placeholder="Nom" value={form.name} onChange={set('name')} className={`${field} ${border('name')}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
          <label htmlFor="cf-name" className={label}>Votre nom</label>
        </Field>
        <Field id="email" error={errors.email}>
          <input id="cf-email" type="email" autoComplete="email" placeholder="E-mail" value={form.email} onChange={set('email')} className={`${field} ${border('email')}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
          <label htmlFor="cf-email" className={label}>Votre e-mail</label>
        </Field>
      </div>

      <fieldset className="mt-10">
        <legend className="eyebrow text-mist-dim">Sujet</legend>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {subjects.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="subject" value={s} checked={form.subject === s} onChange={set('subject')} className="peer sr-only" />
              <span className="block rounded-full border border-bone/25 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-bone peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent sm:text-base">{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <Field id="message" error={errors.message} className="mt-6">
        <textarea id="cf-message" rows={4} placeholder="Message" value={form.message} onChange={set('message')} className={`${field} ${border('message')} resize-none`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
        <label htmlFor="cf-message" className={label}>Votre message</label>
      </Field>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xs text-sm text-mist-dim" role="status" aria-live="polite">{messages[status]}</p>
        <button type="submit" disabled={status === 'sending'} className="btn group bg-accent !py-3 !pl-8 !pr-3 text-ink hover:bg-bone disabled:opacity-60">
          Envoyer le message
          <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-accent transition-transform duration-500 group-hover:rotate-45"><Arrow /></span>
        </button>
      </div>
    </form>
  );
}

function Field({ id, error, className = '', children }) {
  return (
    <div className={className}>
      <div className="relative">{children}</div>
      {error && <p id={`cf-${id}-err`} className="mt-2 text-sm text-accent">{error}</p>}
    </div>
  );
}
