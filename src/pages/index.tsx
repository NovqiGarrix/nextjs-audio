import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import axios from "axios";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/outline";

import { useAudio } from "../contexts/AudioContext";
import { Audio } from "../types";

import onAudioClick from "../utils/onAudioClick";
import getBaseURL from "../utils/getBaseURL";
import classNames from "../utils/classNames";
import { useState } from "react";

interface IHomeProps {
  playingNowAudio?: Audio;
}

const Home: NextPage<IHomeProps> = (props) => {
  const { playingNowAudio } = props;
  const { audios, setPlayingNow, playingNow, ref, isPlaying, setIsPlaying } =
    useAudio();

  const [title, setTitle] = useState(
    playingNowAudio ? playingNowAudio.title : "NvMusic with Next.js"
  );

  const onClick = async (audio: Audio) => {
    if (playingNow === audio.slug) {
      if (!ref.current) {
        console.log("Ref does not initialize yet!");
        return;
      }

      if (ref.current.paused) {
        await ref.current.play();
        setIsPlaying(true);
        return;
      }

      ref.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      setIsPlaying(true);
      await onAudioClick(audio, () => {
        setPlayingNow(audio.slug);
        setTitle(audio.title);
      });
    } catch (error: any) {
      console.info(error.message);
    }
  };

  return (
    <div className="mx-auto my-auto flex items-center justify-center h-screen flex-col space-y-5">
      <Head>
        <title>{title}</title>
        <meta name="description" content="NvMusic built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-sm mb-10">
        <h2 className="text-4xl text-green-600 font-bold leading-relaxed text-center w-full mb-7">
          Playlists
        </h2>

        <div className="space-y-4">
          {audios.map((audio) => (
            <button
              type="button"
              key={audio.slug}
              onClick={() => onClick(audio)}
              className={classNames(
                "py-3 px-4 rounded-lg group w-full text-center hover:bg-green-500 flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600",
                isPlaying && audio.slug === playingNow
                  ? "bg-green-500"
                  : "even:bg-gray-100 odd:bg-transparent"
              )}
            >
              {isPlaying && audio.slug === playingNow ? (
                <PauseIcon
                  className={classNames(
                    "w-5 h-5 text-gray-500 group-hover:text-white mr-3 transition-all duration-150",
                    isPlaying && audio.slug === playingNow
                      ? "text-white"
                      : "text-gray-500"
                  )}
                />
              ) : (
                <PlayIcon className="w-5 h-5 text-gray-500 group-hover:text-white mr-3 transition-all duration-150" />
              )}
              <span
                className={classNames(
                  "text-gray-500 group-hover:text-white transition-all duration-150",
                  isPlaying && audio.slug === playingNow
                    ? "text-white"
                    : "text-gray-500"
                )}
              >
                {audio.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <Link passHref href="/novri">
        <a className="text-lg text-orange-500 font-medium">Go to other page</a>
      </Link>
    </div>
  );
};

export default Home;
export async function getServerSideProps() {
  console.time("Serverless Time");

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

  console.timeEnd("Serverless Time");

  return {
    props: {
      audios,
      playingNow,
    },
  };
}
