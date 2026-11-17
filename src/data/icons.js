import {
  Bug, Cloud, Code2, Cpu, Database, Eye, FileText, Fingerprint, Fish, Globe, GraduationCap,
  KeyRound, Lightbulb, Lock, MailWarning, Megaphone, Microscope, Network, Radar, Router,
  ScanSearch, Search, Server, Shield, ShieldAlert, ShieldCheck, Shuffle, Terminal, Wifi,
  Workflow, Wrench,
} from 'lucide-react';
import {
  siAnsible, siArduino, siBurpsuite, siCanva, siCisco, siDebian, siDocker, siElastic, siFigma,
  siFreecad, siGit, siGithub, siGnubash, siGnuprivacyguard, siHackthebox, siHtml5, siJavascript,
  siJupyter, siKalilinux, siLetsencrypt, siLinux, siMetasploit, siNotion, siOdoo, siOpenssl,
  siOpenvpn, siOwasp, siParrotsecurity, siPython, siRaspberrypi, siSnort, siSplunk, siTorproject,
  siTryhackme, siUbuntu, siVirtualbox, siVirustotal, siVmware, siWireguard, siWireshark,
} from 'simple-icons';

/* Catalogue d'icônes utilisable depuis l'interface d'administration.
   - Icônes génériques (Lucide) : clé = nom de l'icône, ex. "Shield".
   - Logos officiels (Simple Icons) : clé = "si:<nom>", ex. "si:wireshark".
   Pour en ajouter : importez-la ici ET ajoutez la même clé dans public/admin/config.yml. */
export const lucideIcons = {
  Bug, Cloud, Code2, Cpu, Database, Eye, FileText, Fingerprint, Fish, Globe, GraduationCap,
  KeyRound, Lightbulb, Lock, MailWarning, Megaphone, Microscope, Network, Radar, Router,
  ScanSearch, Search, Server, Shield, ShieldAlert, ShieldCheck, Shuffle, Terminal, Wifi,
  Workflow, Wrench,
};

export const brandIcons = Object.fromEntries(
  [
    siAnsible, siArduino, siBurpsuite, siCanva, siCisco, siDebian, siDocker, siElastic, siFigma,
    siFreecad, siGit, siGithub, siGnubash, siGnuprivacyguard, siHackthebox, siHtml5, siJavascript,
    siJupyter, siKalilinux, siLetsencrypt, siLinux, siMetasploit, siNotion, siOdoo, siOpenssl,
    siOpenvpn, siOwasp, siParrotsecurity, siPython, siRaspberrypi, siSnort, siSplunk, siTorproject,
    siTryhackme, siUbuntu, siVirtualbox, siVirustotal, siVmware, siWireguard, siWireshark,
  ].map((b) => [`si:${b.slug}`, b]),
);

/** Renvoie { brand } pour un logo officiel, { Icon } pour une icône générique (repli : Shield). */
export function resolveIcon(key) {
  if (key && brandIcons[key]) return { brand: brandIcons[key] };
  return { Icon: lucideIcons[key] || Shield };
}
