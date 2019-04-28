const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');
const {
  PDFDocumentFactory,
  PDFDocumentWriter,
  StandardFonts,
  drawText,
  drawImage,
} = require('pdf-lib');
//const attachments = [];



function signPostalPdf(userData) {

  const assets = {
    ubuntuFontBytes: fs.readFileSync('../assets/ubuntu-fonts/Ubuntu-R.ttf'),
    testSignaturePngBytes: dataUriToBuffer(userData.signature),
    euCitzienEnglishPdfBytes: fs.readFileSync('../assets/postal-form.pdf'),
  };

  const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

  const COURIER_FONT = 'Courier';
  const SIGNATURE_PNG = 'SignaturePng';

  const [courierRef, courierFont] = pdfDoc.embedStandardFont(
    StandardFonts.Courier,
  );

  const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.testSignaturePngBytes);

  const pages = pdfDoc.getPages();

  const existingPage = pages[1]
    .addFontDictionary(COURIER_FONT, courierRef)
    .addImageObject(SIGNATURE_PNG, SignaturePngRef);

  const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.15;
  const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.15;

  const newContentStream = pdfDoc.createContentStream(
    drawImage(SIGNATURE_PNG, {
      x: 400,
      y: 50,
      width: SIGNATURE_PNG_WIDTH,
      height: SIGNATURE_PNG_HEIGHT,
    }),
    drawText(courierFont.encodeText(userData.surname), {
      x: 50,
      y: 625,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstName), {
      x: 50,
      y: 585,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.addressLine1), {
      x: 50,
      y: 540,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.addressLine2), {
      x: 50,
      y: 521,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.addressLine3), {
      x: 50,
      y: 503,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.postCode), {
      x: 205,
      y: 480,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.citizenCountry), {
      x: 415,
      y: 677,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
  );

  existingPage.addContentStreams(pdfDoc.register(newContentStream));

  const pdfBytes = Buffer.from(PDFDocumentWriter.saveToBytes(pdfDoc)).toString('base64');

  // const outputDir = `${__dirname}/../output`;
  // const filePath = `${outputDir}/${Date.now()}.pdf`;
  // if (!fs.existsSync(outputDir)){
  //   fs.mkdirSync(outputDir);
  // }
  //fs.writeFileSync(filePath, pdfBytes);

  //attachments.push(pdfBytes);
  return pdfBytes;
}

module.exports = signPostalPdf;
