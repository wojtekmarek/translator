import text_translate from "../../servises/text-translate";
import generate_pdf from "../../servises/generete-pdf";
export default defineEventHandler(async (event) => {
 return new Promise(async (resolve, reject) => {
    await readBody(event)
      
      .then( text => {

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

})