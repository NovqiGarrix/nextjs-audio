import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Audio } from "../types";

const DetailName: NextPage = () => {
  const router = useRouter();

  return (
    <main className="flex items-center h-screen w-full justify-center">
      <h1 className="text-5xl text-orange-600 font-semibold font-poppins">
        Hello, {router.query?.name}
      </h1>
    </main>
  );
};

export default DetailName;

export async function getServerSideProps() {
  const audios: Array<Audio> = [
    {
      duration: 2 * 60,
      singer: "ILLENIUM",
      slug: "fortress",
      title: "Fortress by ILLENIUM",
      src: "/fortress.mp3",
    },
  ];

  const resp = await fetch("/api/redis?key=playingNow");
  const { data: playingNow } = await resp.json();

  return {
    props: {
      audios,
      playingNow,
    },
  };
}
