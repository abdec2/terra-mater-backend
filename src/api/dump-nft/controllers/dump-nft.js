'use strict';
const fs = require('fs');
/**
 * A set of functions called "actions" for `dump-nft`
 */

module.exports = {
  importData: async (ctx, next) => {
    try {
      fs.readFile(ctx.request.files.file.path,'utf8', async (err, data) => {
        const Gateway = 'https://gateway.pinata.cloud/ipfs/';
        const collectionId = ctx.request.body.collection;
        const tokenStandard = ctx.request.body.standard;
        const json = JSON.parse(data); 
        // try {
        //   const imgUrl = json[0].image.slice(7);
        //   const entryData = {
        //     token_name: json[0].name,
        //     owner: '',
        //     description: json[0].description,
        //     token_id: json[0].edition,
        //     token_standard: tokenStandard,
        //     img_url: Gateway + imgUrl,
        //     collection: parseInt(collectionId),
        //     nft_status: 1,
        //     publishedAt: new Date().toISOString()
        //   }
        //   const nft = await strapi.entityService.create('api::nft-v1.nft-v1', {
        //     data:entryData
        //   });
        //   try {
        //     json[0].attributes.map(async prop => {
        //       const nftProp = await strapi.entityService.create('api::nft-prop.nft-prop', {
        //         data: {
        //           nft_v_1: nft.id,
        //           Property: prop.trait_type,
        //           value: prop.value,
        //           publishedAt: new Date().toISOString()
        //         }
        //       })
        //     })
        //   } catch(e) {
        //     console.log(e.details)
        //   }
          
        // } catch(e) {
        //   console.log(e.details)
        // }
        json.map(async item => {
          try {
            const imgUrl = item.image.slice(7);
            const entryData = {
              token_name: item.name,
              owner: '',
              description: item.description,
              token_id: item.edition,
              token_standard: tokenStandard,
              img_url: Gateway + imgUrl,
              collection: parseInt(collectionId),
              nft_status: 1,
              publishedAt: new Date().toISOString()
            }
            const nft = await strapi.entityService.create('api::nft-v1.nft-v1', {
              data:entryData
            });

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
