import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Fragment, useEffect, useMemo } from "react";
import { AudioContextProvider, useAudio } from "../contexts/AudioContext";

function MyApp({ Component, pageProps }: AppProps) {
  const { playingNow: _playingNow, audios, ref } = useAudio();

  const playingNow = useMemo(() => {
    if (!_playingNow) return undefined;

    const audio = audios.find((au) => au.slug === _playingNow);
    return audio;
  }, [_playingNow, audios]);

  useEffect(() => {
    console.log(ref.current);
    if (ref.current) {
      ref.current.play();
    }
  }, [playingNow, ref]);

  return (
    <Fragment>
      {playingNow && <audio src={playingNow.src} ref={ref} autoPlay loop />}
      <Component {...pageProps} />
    </Fragment>
  );
}

function MyAppWrapper({ Component, pageProps }: AppProps) {
  return (
    <AudioContextProvider
      audios={pageProps?.audios ?? []}
      playingNow={pageProps?.playingNow}
    >
      <MyApp Component={Component} {...pageProps} />
    </AudioContextProvider>
  );
}

export default MyAppWrapper;
