export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/lighthouse", label: "Lighthouse" },
  { href: "/essays", label: "Essays" },
  { href: "/library", label: "Library" },
  { href: "/tools", label: "Tools" },
  { href: "/about", label: "About" },
];
