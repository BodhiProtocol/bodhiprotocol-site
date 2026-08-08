export interface NavLink {
  href: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { href: "/capital-markets-business-analyst", label: "Start Here" },
  { href: "/essays", label: "Essays" },
  { href: "/ba-playbooks", label: "BA Playbooks" },
  { href: "/tools", label: "Tools" },
  { href: "/simulators", label: "Simulators" },
  { href: "/library", label: "Library" },
  { href: "/about", label: "About" },
];

export const seriesLinks: NavLink[] = [
  { href: "/invisible-businesses", label: "Invisible Businesses" },
  { href: "/great-minds", label: "Great Minds" },
];

/** True for the link's own route and any of its child routes (e.g. "/ba-playbooks/[slug]"). */
export function isNavLinkActive(pathname: string | null, href: string): boolean {
  return pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
}
