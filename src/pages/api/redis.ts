import { NextApiRequest, NextApiResponse } from 'next';

import { RedisClient } from '../../utils/redisClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const METHOD = req.method;
    const redisClient = RedisClient.getClient();

    switch (METHOD) {
        case "GET": {
            const key = req.query?.key as string;
            if (!key || typeof key !== 'string') return res.status(406).send({ msg: "Key has to be type string!" });

            const data = await redisClient.get(key);
            return res.send({ data });
        }

        case "POST": {
            const { key, value, maxAge } = req.body;

            if (!key || !value) return res.status(406).send({ msg: "Please provide the key and the value" });
            if (typeof key !== "string" || typeof value !== "string") return res.status(406).send({ msg: "Incorret Input. The API only allowed string value." });

            if (maxAge) {
                if (typeof maxAge !== "number") return res.status(406).send({ msg: "Max Age has to be a number." });
                const resp = await redisClient.setex(key, maxAge, value);
                return res.send({ data: resp });
            }

            const resp = await redisClient.set(key, value);
            return res.send({ data: resp });
        }

        default:
            return res.status(405).send("Method Not Allowed");
    }

}