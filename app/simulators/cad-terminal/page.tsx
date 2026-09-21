import type { Metadata } from "next";

import { CadTerminalSimulator } from "@/components/simulators/cad-terminal/cad-terminal-simulator";

const description =
  "Predict how a real OMS handles cancel, amend, and delete requests against a live order blotter, then watch the execution report land.";

export const metadata: Metadata = {
  title: "Cancel / Amend / Delete Terminal - Simulators",
  description,
  alternates: { canonical: "/simulators/cad-terminal" },
  openGraph: {
    type: "website",
    title: "Cancel / Amend / Delete Terminal",
    description,
    url: "/simulators/cad-terminal",
    images: ["/opengraph-image"],
  },
};

export default function CadTerminalPage() {
  return <CadTerminalSimulator />;
}
