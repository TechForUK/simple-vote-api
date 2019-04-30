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

function signBasicForm (userData) {
  const assets = {
    ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
    testSignaturePngBytes: dataUriToBuffer(userData.signature),
    euCitzienEnglishPdfBytes: fs.readFileSync('./assets/basic-form.pdf'),
  };

  const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

  const COURIER_FONT = 'Courier';
  const SIGNATURE_PNG = 'SignaturePng';

  const [courierRef, courierFont] = pdfDoc.embedStandardFont(
    StandardFonts.Courier,
  );


  const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.testSignaturePngBytes);

  const pages = pdfDoc.getPages();

  const existingPage1 = pages[0]
    .addFontDictionary(COURIER_FONT, courierRef)
    .addImageObject(SIGNATURE_PNG, SignaturePngRef);

  const existingPage2 = pages[1]
    .addFontDictionary(COURIER_FONT, courierRef)
    .addImageObject(SIGNATURE_PNG, SignaturePngRef);

  const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.15;
  const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.15;

  const newContentStream1 = pdfDoc.createContentStream(
    drawImage(SIGNATURE_PNG, {
      x: 400,
      y: 50,
      width: SIGNATURE_PNG_WIDTH,
      height: SIGNATURE_PNG_HEIGHT,
    }),
    drawText(courierFont.encodeText(userData.surname), {
      x: 180,
      y: 533,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstName), {
      x: 180,
      y: 559,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstLineAddress), {
      x: 180,
      y: 507,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.secondLineAddress), {
      x: 180,
      y: 488,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.city), {
      x: 180,
      y: 470,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.postcode), {
      x: 405,
      y: 470,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText('X'), {
      x: 211,
      y: 453,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.nationality), {
      x: 80,
      y: 322,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText('X'), {
      x: 50,
      y: 245,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    })
  );

  existingPage1.addContentStreams(pdfDoc.register(newContentStream1));

  //const ninNoSpaces = userData.nin.replace(/ /g,'');
  const ninNoSpaces = userData.nin.replace(/\s+/g, '');
  console.log(ninNoSpaces);

  console.log(ninNoSpaces[0],ninNoSpaces[1],ninNoSpaces[2],ninNoSpaces[3],ninNoSpaces[4],ninNoSpaces[5],ninNoSpaces[6],ninNoSpaces[7],ninNoSpaces[8]);

  const newContentStream2 = pdfDoc.createContentStream(
    drawText(courierFont.encodeText('X'), {
      x: 59,
      y: 781,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[0]), {
      x: 138,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[1]), {
      x: 152,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[2]), {
      x: 166,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[3]), {
      x: 180,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[5]), {
      x: 53,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[6]), {
      x: 67,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[8]), {
      x: 96,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[9]), {
      x: 110,
      y: 728,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText('X'), {
      x: 52,
      y: 333,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[0]), {
      x: 56,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[1]), {
      x: 72,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[2]), {
      x: 99,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[3]), {
      x: 113,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[4]), {
      x: 141,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[5]), {
      x: 155,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[6]), {
      x: 184,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[7]), {
      x: 198,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(ninNoSpaces[8]), {
      x: 229,
      y: 641,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),

  );

  existingPage2.addContentStreams(pdfDoc.register(newContentStream2));


  // const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
  // const outputDir = `${__dirname}/../output`;
  // const filePath = `${outputDir}/signBasicForm2.pdf`;
  // if (!fs.existsSync(outputDir)){
  //   fs.mkdirSync(outputDir);
  // }
  // fs.writeFileSync(filePath, pdfBytes);

  const pdfBase64 = Buffer.from(PDFDocumentWriter.saveToBytes(pdfDoc)).toString('base64');
  return pdfBase64;
}

module.exports = signBasicForm;