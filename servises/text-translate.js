import translate from "translate";
export default  function text_translate(text) {
    
    translate.engine = "google";
    translate.key = process.env.GOOGLE_KEY;
    const text_en = translate(text, {to:"en", from:"pl"});
    const text_es = translate(text, {to:"es", from:"pl"});
    const text_de = translate(text, {to:"de", from:"pl"});
    return Promise.all([text_en, text_es, text_de])
    
  }