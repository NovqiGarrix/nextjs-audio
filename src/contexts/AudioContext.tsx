import {
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  Context,
  ReactNode,
  FunctionComponent,
  useState,
  useRef,
  RefObject,
} from "react";
import { Audio } from "../types";

export interface IAudioContenxtProps {
  audios: Array<Audio>;
  setAudios: Dispatch<SetStateAction<Array<Audio>>>;

  playingNow?: string; // Slug of the audio
  setPlayingNow: Dispatch<SetStateAction<string | undefined>>;

  ref: RefObject<HTMLAudioElement>;

  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const AudioContext = createContext<IAudioContenxtProps | null>(
  null
) as Context<IAudioContenxtProps>;

interface IAudioContextProviderProps {
  playingNow?: string;
  audios: IAudioContenxtProps["audios"];
  children: ReactNode;
}

export const AudioContextProvider: FunctionComponent<
  IAudioContextProviderProps
> = (props) => {
  const { audios: _audios, playingNow: _playingNow, children } = props;

  const [audios, setAudios] = useState(_audios);
  const [playingNow, setPlayingNow] = useState(_playingNow);
  const [isPlaying, setIsPlaying] = useState(false);

  const ref = useRef<HTMLAudioElement>(null);

  const value: IAudioContenxtProps = {
    audios,
    setAudios,

    playingNow,
    setPlayingNow,

    ref,

    isPlaying,
    setIsPlaying,
  };

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
