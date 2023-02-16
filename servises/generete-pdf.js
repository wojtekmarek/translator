import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const wrapText = (text, width, font, fontSize) => {
  const words = text.split(' ');
  let line = '';
  let result = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const testWidth = font.widthOfTextAtSize(testLine, fontSize);
    if (testWidth > width - 80) {
      result += line + '\n';
      line = words[n] + ' ';
    } else {
      line = testLine;
    }
  }
  result += line;
  return result;
}
const generate_page = (text, pdf, font, fontSize) => {
  
  const page = pdf.addPage();

  const { width, height } = page.getSize();


  page.drawText(wrapText(text, width, font, fontSize), {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: font,
    color: rgb(0, 0, 0),
  })
}

export default async function generate_pdf(array) {


  const pdfDoc = await PDFDocument.create();
  const fontSize = 15;
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

   array.forEach(element => {

    generate_page(element, pdfDoc, timesRomanFont, fontSize);
  });

  const pdfBytes = await pdfDoc.save()




  return pdfBytes
}