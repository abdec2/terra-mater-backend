'use strict';
const fs = require('fs');
/**
 * A set of functions called "actions" for `email-attachment`
 */

module.exports = {
  sendEmail: async (ctx, next) => {
    try {
      const file = ctx.request.files.attachment;
      const filePath = file.path;
      const data = ctx.request.body;

      const dataObj = {
        to: data.to,
        subject: 'Do you have Project Form',
        html: `
          <p>Name: ${data.name}</p>
          <p>Surame: ${data.surname}</p>
          <p>Description: ${data.desc}</p>
          <p>Reference Link: ${data.ref_link}</p>
        `
      }

      if (file.size !== 0) {
        dataObj.attachments = [
          {
            filename: file.name,
            path: filePath
          }
        ];
      }

      res = await strapi.plugins['email'].services.email.send(dataObj).then(() => console.log('Sent')).catch((err) => console.log(err));
      ctx.send('DONE');


    } catch (err) {
      ctx.body = err;
    }
  }
};
