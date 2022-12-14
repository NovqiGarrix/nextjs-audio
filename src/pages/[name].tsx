import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";

import { Audio } from "../types";
import getBaseURL from "../utils/getBaseURL";
import Head from "next/head";

const DetailName: NextPage = () => {
  const router = useRouter();

  return (
    <main className="flex items-center h-screen w-full justify-center">
      <Head>
        <title>{"Hello, " + router?.query?.name}</title>
      </Head>

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
      src: "/musics/fortress.mp3",
    },
    {
      duration: 2 * 60,
      singer: "Marsmello",
      slug: "singMeToSleep",
      title: "Sing Me to Sleep by Marsmello",
      src: "/musics/singMeToSleep.mp3",
    },
  ];

  const BASE_URL = getBaseURL();

  const {
    data: { data: playingNow },
  } = await axios.get(`${BASE_URL}/api/redis?key=playingNow`);

  return {
    props: {
      audios,
      playingNow,
    },
  };
}
