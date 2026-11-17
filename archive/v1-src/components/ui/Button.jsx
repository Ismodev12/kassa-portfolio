const styles = {
  primary:
    'bg-volt text-night hover:bg-paper shadow-[0_10px_40px_-12px_rgb(38_139_255/0.7)]',
  ghost:
    'border border-paper/15 text-paper hover:border-volt/60 hover:bg-volt/10',
};

/** Bouton ou lien (si `href`) avec icône optionnelle à droite. */
export default function Button({ href, variant = 'primary', icon: Icon, className = '', children, ...rest }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      className={`group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 font-display text-[0.95rem] font-medium tracking-tight transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
      {Icon && <Icon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />}
    </Tag>
  );
}
