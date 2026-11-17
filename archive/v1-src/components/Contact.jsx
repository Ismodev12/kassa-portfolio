import { useState } from 'react';
import { AlertCircle, ArrowUpRight, CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send, Target } from 'lucide-react';
import { profile } from '../config/profile.js';
import SectionHeading from './ui/SectionHeading.jsx';
import Reveal from './ui/Reveal.jsx';
import TodoText from './ui/TodoText.jsx';
import Button from './ui/Button.jsx';

const linkIcons = { linkedin: Linkedin, github: Github };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const initial = { name: '', email: '', subject: '', message: '' };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Indiquez votre nom.';
  if (!EMAIL_RE.test(v.email.trim())) e.email = 'Indiquez une adresse e-mail valide.';
  if (!v.subject.trim()) e.subject = 'Indiquez le sujet de votre message.';
  if (v.message.trim().length < 10) e.message = 'Votre message doit contenir au moins 10 caractères.';
  return e;
}

export default function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | mailto | unconfigured | error

  const { email, phone, location } = profile.contact;
  const endpoint = profile.contactForm.endpoint;

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    if (endpoint) {
      setStatus('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        setValues(initial);
      } catch {
        setStatus('error');
      }
      return;
    }

    if (email) {
      const body = `${values.message}\n\n— ${values.name} (${values.email})`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('unconfigured');
  };

  const field =
    'w-full rounded-2xl border bg-paper/[0.03] px-4 py-3.5 text-paper placeholder:text-paper/30 transition-colors duration-300 focus:bg-paper/[0.05] focus:outline-none';
  const border = (name) => (errors[name] ? 'border-paper/60' : 'border-paper/12 focus:border-volt');

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden="true" className="absolute -bottom-60 left-1/2 -z-10 size-[48rem] -translate-x-1/2 rounded-full bg-volt/[0.1] blur-[160px]" />
      <div className="shell">
        <SectionHeading
          index="05"
          label="Contact"
          title={<>Un projet de sécurité ? <span className="text-volt">Échangeons ensemble.</span></>}
        >
          Une question, une collaboration ou un projet autour de la fraude, des risques ou de la réponse aux incidents :
          écrivez-moi.
        </SectionHeading>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          {/* Coordonnées */}
          <Reveal className="flex flex-col gap-6 lg:col-span-5">
            <div className="rounded-[1.75rem] border border-paper/10 bg-paper/[0.02] p-7 sm:p-8">
              <p className="eyebrow text-paper/50">Coordonnées</p>
              <ul className="mt-6 space-y-5">
                <ContactRow icon={Mail} label="E-mail">
                  {email ? <a href={`mailto:${email}`} className="hover:text-volt">{email}</a> : <TodoText value={{ todo: 'Adresse e-mail' }} />}
                </ContactRow>
                <ContactRow icon={Phone} label="Téléphone">
                  {phone ? <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-volt">{phone}</a> : <TodoText value={{ todo: 'Numéro de téléphone' }} />}
                </ContactRow>
                <ContactRow icon={MapPin} label="Localisation">{location}</ContactRow>
                <ContactRow icon={Target} label="Domaines">Fraude · Risques · Réponse aux incidents</ContactRow>
              </ul>
            </div>

            <div className="rounded-[1.75rem] border border-paper/10 bg-paper/[0.02] p-7 sm:p-8">
              <p className="eyebrow text-paper/50">Liens professionnels</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {profile.links.map((link) => {
                  const Icon = linkIcons[link.id];
                  return (
                    <li key={link.id}>
                      {link.url ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-center justify-between gap-3 rounded-xl border border-paper/10 px-4 py-3 transition-colors hover:border-volt/50 hover:bg-volt/10"
                        >
                          <span className="flex items-center gap-2.5">
                            {Icon ? <Icon className="size-4 text-volt" aria-hidden="true" /> : <span className="size-1.5 rounded-full bg-volt" aria-hidden="true" />}
                            {link.label}
                          </span>
                          <ArrowUpRight className="size-4 text-paper/40 transition-transform group-hover:rotate-45 group-hover:text-volt" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-paper/15 px-4 py-3 text-paper/45">
                          <span className="flex items-center gap-2.5">
                            {Icon ? <Icon className="size-4" aria-hidden="true" /> : <span className="size-1.5 rounded-full bg-paper/30" aria-hidden="true" />}
                            {link.label}
                          </span>
                          <span className="text-xs">À compléter</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Formulaire */}
          <Reveal delay={120} className="lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="h-full rounded-[1.75rem] border border-paper/10 bg-night-deep/60 p-7 backdrop-blur sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Nom" error={errors.name}>
                  <input id="contact-name" name="name" autoComplete="name" value={values.name} onChange={onChange} placeholder="Votre nom" className={`${field} ${border('name')}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
                </Field>
                <Field id="email" label="Adresse e-mail" error={errors.email}>
                  <input id="contact-email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} placeholder="vous@exemple.com" className={`${field} ${border('email')}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
                </Field>
              </div>
              <div className="mt-5">
                <Field id="subject" label="Sujet" error={errors.subject}>
                  <input id="contact-subject" name="subject" value={values.subject} onChange={onChange} placeholder="Objet de votre message" className={`${field} ${border('subject')}`} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'err-subject' : undefined} />
                </Field>
              </div>
              <div className="mt-5">
                <Field id="message" label="Message" error={errors.message}>
                  <textarea id="contact-message" name="message" rows={6} value={values.message} onChange={onChange} placeholder="Décrivez votre besoin…" className={`${field} ${border('message')} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
                </Field>
              </div>

              <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <Button type="submit" icon={status === 'sending' ? Loader2 : Send} disabled={status === 'sending'} className="w-full sm:w-auto">
                  {status === 'sending' ? 'Envoi en cours…' : 'Envoyer le message'}
                </Button>
                <FormStatus status={status} />
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon: Icon, label, children }) {
  return (
    <li className="flex items-start gap-4">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-volt/10 text-volt">
        <Icon className="size-[18px]" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-paper/45">{label}</p>
        <p className="mt-0.5 break-words font-display font-medium">{children}</p>
      </div>
    </li>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={`contact-${id}`} className="mb-2 block text-sm text-paper/65">{label}</label>
      {children}
      {error && (
        <p id={`err-${id}`} className="mt-2 flex items-center gap-1.5 text-sm text-paper/80">
          <AlertCircle className="size-3.5 text-volt" aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

function FormStatus({ status }) {
  const messages = {
    sent: { icon: CheckCircle2, text: 'Merci, votre message a bien été envoyé.' },
    mailto: { icon: CheckCircle2, text: 'Votre messagerie s’ouvre avec le message pré-rempli.' },
    error: { icon: AlertCircle, text: 'L’envoi a échoué. Merci de réessayer plus tard.' },
    unconfigured: { icon: AlertCircle, text: 'L’envoi du formulaire n’est pas encore activé. Les coordonnées seront bientôt disponibles.' },
  };
  const m = messages[status];
  return (
    <p role="status" aria-live="polite" className="min-h-[1.25rem] text-sm text-paper/70">
      {m && (
        <span className="flex items-start gap-2">
          <m.icon className="mt-0.5 size-4 shrink-0 text-volt" aria-hidden="true" />
          {m.text}
        </span>
      )}
    </p>
  );
}
