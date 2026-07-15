export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/labs", label: "Tools" },
  { href: "/lighthouse", label: "Lighthouse" },
  { href: "/essays", label: "Essays" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];
