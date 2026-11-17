import {
  Activity, Box, Code2, Cpu, Crosshair, Fish, FileCode2, Globe, KeyRound, Lightbulb,
  Microscope, Network, Radar, Router, ScanSearch, Server, Shield, ShieldAlert,
  ShieldCheck, Shuffle, SquareTerminal, Terminal,
} from 'lucide-react';

/* Compétences et outils, regroupés par domaine.
   Volontairement sans niveau chiffré ni pourcentage. */
export const skillGroups = [
  {
    id: 'defense',
    title: 'Sécurité et défense',
    caption: 'Détection, test et protection',
    icon: Shield,
    items: [
      { name: 'Kali Linux', icon: Crosshair },
      { name: 'Snort', icon: ShieldAlert },
      { name: 'GoPhish', icon: Fish },
      { name: 'Cryptographie', icon: KeyRound },
    ],
  },
  {
    id: 'reseaux',
    title: 'Réseaux et systèmes',
    caption: 'Les fondations de l’infrastructure',
    icon: Network,
    items: [
      { name: 'Linux', icon: Terminal },
      { name: 'Réseaux informatiques', icon: Server },
      { name: 'Cisco Packet Tracer', icon: Router },
      { name: 'dig', icon: Globe },
    ],
  },
  {
    id: 'analyse',
    title: 'Analyse et investigation',
    caption: 'Observer, comprendre, reconstituer',
    icon: Microscope,
    items: [
      { name: 'Wireshark', icon: Activity },
      { name: 'Zeek', icon: Radar },
      { name: 'Forensic', icon: ScanSearch },
      { name: 'dnstwist', icon: Shuffle },
    ],
  },
  {
    id: 'dev',
    title: 'Développement et automatisation',
    caption: 'Outiller l’analyse',
    icon: Code2,
    items: [
      { name: 'Python', icon: FileCode2 },
      { name: 'Bash', icon: SquareTerminal },
      { name: 'Développement web', icon: Code2 },
    ],
  },
  {
    id: 'sensibilisation',
    title: 'Sensibilisation et projets techniques',
    caption: 'Transmettre et construire',
    icon: Lightbulb,
    items: [
      { name: 'Hygiène numérique', icon: ShieldCheck },
      { name: 'Arduino', icon: Cpu },
      { name: 'FreeCAD', icon: Box },
    ],
  },
];
