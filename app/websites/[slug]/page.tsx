import WebsiteHeader from "@/composants/ui/WebsiteHeader";
import { WebsiteType } from "@/types/website";
import path from "path";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";

async function getWebsites(): Promise<WebsiteType[]> {
  const filePath = path.join(process.cwd(), "public", "websites.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileContents);
}

export async function generateStaticParams() {
  const websites = await getWebsites();
  return websites.map((w) => ({ slug: w.slug }));
}

export default async function WebsitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const websites = await getWebsites();
  const website = websites.find((w) => w.slug === slug);

  if (!website) notFound();

  return (
    <main>
      <WebsiteHeader website={website} />
    </main>
  );
}
