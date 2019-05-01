const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');
const {
  PDFDocumentFactory,
  PDFDocumentWriter,
  StandardFonts,
  drawText,
  drawImage,
} = require('pdf-lib');

function signEuForm(userData) {
  const assets = {
    ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
    signaturePngBytes: dataUriToBuffer(userData.signature),
    euCitzienEnglishPdfBytes: fs.readFileSync('./assets/eu-form.pdf'),
  };

  const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

  const COURIER_FONT = 'Courier';
  const SIGNATURE_PNG = 'SignaturePng';

  const [courierRef, courierFont] = pdfDoc.embedStandardFont(
    StandardFonts.Courier,
  );

  const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.signaturePngBytes);

  const pages = pdfDoc.getPages();
  const existingPage = pages[1]
    .addFontDictionary(COURIER_FONT, courierRef)
    .addImageObject(SIGNATURE_PNG, SignaturePngRef);

  const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.08;
  const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.08;

  var differentAddressYes = '';
  var differentAddressNo = 'X';
  if (userData.differentAddress){
    differentAddressYes = 'X';
    differentAddressNo = '';
  }

  var registeredAtHomeYes = '';
  var registeredAtHomeNo = 'X';
  if (userData.registeredAtHome){
    registeredAtHomeYes = 'X';
    registeredAtHomeNo = '';
  }

  const newContentStream = pdfDoc.createContentStream(
    drawImage(SIGNATURE_PNG, {
      x: 330,
      y: 95,
      width: SIGNATURE_PNG_WIDTH,
      height: SIGNATURE_PNG_HEIGHT,
    }),
    drawText(courierFont.encodeText(userData.surname), {
      x: 50,
      y: 676,
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
    drawText(courierFont.encodeText(userData.firstLineAddress), {
      x: 50,
      y: 540,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.secondLineAddress), {
      x: 50,
      y: 523,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.city), {
      x: 50,
      y: 506,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(differentAddressNo), {
      x: 212,
      y: 450,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(differentAddressNo), {
      x: 538,
      y: 600,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(differentAddressYes), {
      x: 258,
      y: 450,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(differentAddressYes), {
      x: 538,
      y: 572,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(differentAddressYes), {
      x: 258,
      y: 417,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(differentAddressYes), {
      x: 258,
      y: 382,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText('X'), {
      x: 130,
      y: 305,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.postcode), {
      x: 205,
      y: 488,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.citizenOf), {
      x: 415,
      y: 678,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstLineCurrentAddress), {
      x: 330,
      y: 520,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.secondLineCurrentAddress), {
      x: 330,
      y: 502,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentPostcode), {
      x: 480,
      y: 469,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentCity), {
      x: 330,
      y: 486,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.homeCountryConstituency), {
      x: 330,
      y: 340,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(registeredAtHomeYes), {
      x: 350,
      y: 409,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(registeredAtHomeNo), {
      x: 391,
      y: 409,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[0]), {
      x: 475,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[1]), {
      x: 490,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[2]), {
      x: 505,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[3]), {
      x: 520,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[5]), {
      x: 440,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[6]), {
      x: 455,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[8]), {
      x: 403,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[9]), {
      x: 418,
      y: 60,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
  );
  
  existingPage.addContentStreams(pdfDoc.register(newContentStream));

  // const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
  // const outputDir = `${__dirname}/../output`;
  // const filePath = `${outputDir}/signEUForm.pdf`;
  // console.log('filePath: ' + filePath);
  // if (!fs.existsSync(outputDir)){
  //   fs.mkdirSync(outputDir);
  // }
  // fs.writeFileSync(filePath, pdfBytes);

  const pdfBase64 = Buffer.from(PDFDocumentWriter.saveToBytes(pdfDoc)).toString('base64');
  return pdfBase64;
}

module.exports = signEuForm;
