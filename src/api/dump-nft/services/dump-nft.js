'use strict';

const https = require('https');
const Stream = require('stream').Transform;
const { Readable } = require("stream");

/**
 * dump-nft service
 */

module.exports = () => ({
    async saveImageFromUrl(url, filename, nftId) {
        try {
            https.get(url, res => {
                const data = new Stream();

                res.on('data', (chunk) => {
                    data.push(chunk);
                })

                res.on('end', async () => {
                    const config = strapi.config.get("plugin.upload");
                    const buffer = data.read();
                    const entity = {
                        name: filename,
                        hash: `${filename}_${new Date().getTime()}`,
                        ext: '.png',
                        mime: 'image/png',
                        size: buffer.length,
                        url: `/uploads/${filename}_${new Date().getTime()}.png`,
                        provider: config.provider,
                    };

                    entity.related = [
                        {
                            id: nftId,
                            __type: 'api::nft-v1.nft-v1',
                            __pivot: { field: 'img' },
                        },
                    ];
                    entity.getStream = () => Readable.from(buffer);
                    strapi.plugin("upload").service("provider").upload(entity);

                    const fileValues = { ...entity };
                    const res1 = await strapi
                        .query("plugin::upload.file")
                        .create({ data: fileValues });

                })

            }).end();
        } catch (e) {
            console.log(e);
        }
    }
});
