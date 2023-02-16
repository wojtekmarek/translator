import translate from "translate";
export default async function text_translate(text) {
    
    translate.engine = "google";
    translate.key = process.env.GOOGLE_KEY;

    const text_en = await translate(text, {to:"en", from:"pl"});
    const text_es = await translate(text, {to:"es", from:"pl"});
    const text_de = await translate(text, {to:"de", from:"pl"});

    return [text_en,text_es,text_de]
  }