'use strict';
const fs = require('fs');
/**
 * A set of functions called "actions" for `dump-nft`
 */

module.exports = {
  importData: async (ctx, next) => {
    try {
      fs.readFile(ctx.request.files.file.path,'utf8', async (err, data) => {
        // const Gateway = 'https://gateway.pinata.cloud/ipfs/';
        const collectionId = ctx.request.body.collection;
        const tokenStandard = ctx.request.body.standard;
        const json = JSON.parse(data);
        json.map(async item => {
          try {
            const imgUrl = item.image;
            const entryData = {
              token_name: item.name,
              description: item.description,
              token_id: item.edition,
              token_standard: tokenStandard,
              img_url: imgUrl,
              collection: parseInt(collectionId),
              nft_status: 1,
              price: 200,
              publishedAt: new Date().toISOString()
            }
            const nft = await strapi.entityService.create('api::nft-v1.nft-v1', {
              data:entryData
            });

            // const imageurl = Gateway + imgUrl;
            // console.log(imageurl);

            // await strapi.service('api::dump-nft.dump-nft').saveImageFromUrl(imageurl, item.edition, nft.id)

            try {
              item.attributes.map(async prop => {
                const nftProp = await strapi.entityService.create('api::nft-prop.nft-prop', {
                  data: {
                    nft_v_1: nft.id,
                    Property: prop.trait_type,
                    value: prop.value,
                    publishedAt: new Date().toISOString()
                  }
                })
              })
            } catch(e) {
              console.log(e.details)
            }

          } catch(e) {
            console.log(e.details)
          } 
        })
      });
      
      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  }
};
