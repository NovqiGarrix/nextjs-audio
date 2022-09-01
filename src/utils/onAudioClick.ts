import { Audio } from "../types";
import getBaseURL from "./getBaseURL";

export default async function onAudioClick(audio: Audio, callback: () => void) {
    const BASE_URL = getBaseURL();

    try {
        const resp = await fetch(`${BASE_URL}/api/redis`, {
            method: "POST",
            body: JSON.stringify({ key: "playingNow", value: audio.slug }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { data, msg } = await resp.json();
        if (data === "OK") {
            callback();
            return;
        }

        console.info("Failed to set playingAudio with: ", msg);
    } catch (error: any) {
        console.error(error.message, "In onAudioClick");
    }
}