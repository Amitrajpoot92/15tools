import { NextRequest, NextResponse } from "next/server";
import { TOOLS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startUrl = searchParams.get("start_url") || "/";

  // Clean slug to check if it matches a known tool
  const cleanSlug = startUrl.replace(/^\//, "").split("?")[0];
  const matchedTool = TOOLS.find((t) => t.slug === cleanSlug);

  const appName = matchedTool ? `${matchedTool.name} - TopCalcBox` : "TopCalcBox - Online Calculators";
  const shortName = matchedTool ? matchedTool.name : "TopCalcBox";
  const appDesc = matchedTool
    ? `${matchedTool.description} Quick access to ${matchedTool.name} and 15+ other free calculator tools.`
    : "A beautiful collection of highly interactive and accurate calculators for your daily needs.";

  const manifestData = {
    name: appName,
    short_name: shortName,
    description: appDesc,
    start_url: startUrl,
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable"
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  };

  return NextResponse.json(manifestData, {
    headers: {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    }
  });
}
