export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/essays", label: "Essays" },
  { href: "/lighthouse", label: "Lighthouse" },
  { href: "/labs", label: "Labs" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];
