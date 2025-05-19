import { personalData } from "@/utils/data/personal-data";
import HomeClient from './home-client';

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    { cache: 'no-store' } // optional: ensures fresh data
  );

  if (!res.ok) {
    throw new Error('Failed to fetch blog data');
  }

  const data = await res.json();

  const filtered = data
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);

  return filtered;
}

export default async function Home() {
  const blogs = await getData();

  return <HomeClient blogs={blogs} />;
}
