import Head from "next/head";
import Image from "next/image";
import type { GetServerSideProps } from "next";

type Website = {
  slug: string;
  title: string;
  thumbnail: string;
};

type WebsitePageProps = {
  website: Website;
};

export default function WebsitePage({ website }: WebsitePageProps) {
  return (
    <>
      <Head>
        <title>{website.title}</title>
      </Head>
      <main>
        <h1>{website.title}</h1>
        <Image
          src={`/websites/${website.thumbnail}`}
          alt={website.title}
          width={800}
          height={450}
        />
      </main>
    </>
  );
}

async function getWebsites(): Promise<Website[]> {
  const response = await fetch(`http://127.0.0.1:3001/websites.json`);

  return response.json();
}

export const getServerSideProps: GetServerSideProps<WebsitePageProps> = async ({
  params,
}) => {
  const websites = await getWebsites();
  const website = websites.find((w) => w.slug === params?.slug);

  if (!website) {
    return { notFound: true };
  }

  return {
    props: {
      website: {
        slug: website.slug,
        title: website.title,
        thumbnail: website.thumbnail,
      },
    },
  };
};
