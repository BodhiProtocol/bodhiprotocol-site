import { FileDown } from "lucide-react";

import { Button } from "@/components/ui/button";

function PdfDownload({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={<a href={url} download />}
    >
      <FileDown className="size-4" />
      Download PDF
    </Button>
  );
}

export { PdfDownload };
