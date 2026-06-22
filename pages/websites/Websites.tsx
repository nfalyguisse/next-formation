import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import type { GetStaticProps } from "next";

type Website = {
  slug: string;
  title: string;
  thumbnail: string;
};

type WebsitesPageProps = {
  websites: Website[];
};

export default function WebsitesPage({ websites }: WebsitesPageProps) {
  return (
    <>
      <Head>
        <title>Websites</title>
      </Head>
      <main>
        <h1>Websites</h1>
        <ul>
          {websites.map((website) => (
            <li key={website.slug}>
              <Link href={`/website/${website.slug}`}>
                <h2>{website.title}</h2>
                <Image
                  src={`/websites/${website.thumbnail}`}
                  alt={website.title}
                  width={400}
                  height={225}
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

async function getWebsites(): Promise<Website[]> {
  const response = await fetch(`http://127.0.0.1:3001/websites.json`);

  return response.json();
}

export const getStaticProps: GetStaticProps<WebsitesPageProps> = async () => {
  const websites = await getWebsites();

  return {
    props: {
      websites: websites.map((website) => ({
        slug: website.slug,
        title: website.title,
        thumbnail: website.thumbnail,
      })),
    },
  };
};
