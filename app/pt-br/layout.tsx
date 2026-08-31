import { HtmlLangSync } from "@/components/layout/html-lang-sync";

export default function PtBrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HtmlLangSync lang="pt-BR" />
      {children}
    </>
  );
}
