import text_translate from "../../middleware/text-translate";
import generate_pdf from "../../middleware/generete-pdf";
export default defineEventHandler(async (event) => {
  const myPromise = await new Promise(async (resolve, reject) => {
    await readBody(event)
      
      .then(async text => {

        text_translate(text)
          .then(async array => {
            generate_pdf(array)
              .then(async pdf => {
                resolve(pdf)
              })
          })
      })
      .catch(error => {
        //handle any errors here
      });
  });

  return myPromise






})