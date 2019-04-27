const fs = require('fs');
const {
  PDFDocumentFactory,
  PDFDocumentWriter,
  StandardFonts,
  drawText,
  drawImage,
} = require('pdf-lib');
const attachments = [];

function signEuForm(userData) {
  const assets = {
    ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
    testSignaturePngBytes: fs.readFileSync('./assets/signature-test.png'),
    euCitzienEnglishPdfBytes: fs.readFileSync('./assets/eu-form.pdf'),
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
      y: 677,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstName), {
      x: 50,
      y: 640,
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
      y: 523,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.addressLine3), {
      x: 50,
      y: 506,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.postCode), {
      x: 205,
      y: 488,
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

  const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);

  const outputDir = `${__dirname}/../output`;
  const filePath = `${outputDir}/${Date.now()}.pdf`;
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }
  fs.writeFileSync(filePath, pdfBytes);

  attachments.push(pdfBytes);
  return filePath;
}

module.exports = signEuForm;
