import { readFileSync } from "node:fs";
import { join } from "node:path";

export function GET() {
  const html = readFileSync(
    join(process.cwd(), "DESIGN_SYSTEM_PAGES_DARK.html"),
    // join(process.cwd(), "DESIGN_SYSTEM_PAGES.html"),
    // join(process.cwd(), "DESIGN_SYSTEM_COMPONENTS.html"),
    // join(process.cwd(), "DESIGN_SYSTEM_VISUAL.html"),
    "utf-8",
  );
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
