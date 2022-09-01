import axios from "axios";

import { Audio } from "../types";
import getBaseURL from "./getBaseURL";

export default async function onAudioClick(audio: Audio, callback: () => void) {
    const BASE_URL = getBaseURL();

    try {
        const { data: { data, msg } } = await axios.post(`${BASE_URL}/api/redis`, { key: "playingNow", value: audio.slug });
        if (data === "OK") {
            callback();
            return;
        }

        console.info("Failed to set playingAudio with: ", msg);
    } catch (error: any) {
        console.error(error.message, "In onAudioClick");
    }
}