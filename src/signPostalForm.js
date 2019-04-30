const fs = require('fs');
const dataUriToBuffer = require('data-uri-to-buffer');
const {
  PDFDocumentFactory,
  PDFDocumentWriter,
  StandardFonts,
  drawText,
  drawImage,
} = require('pdf-lib');

function signBasicForm (userData) {
  const assets = {
    ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
    testSignaturePngBytes: dataUriToBuffer(userData.signature),
    euCitzienEnglishPdfBytes: fs.readFileSync('./assets/postal-form.pdf'),
  };

  const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

  const COURIER_FONT = 'Courier';
  const SIGNATURE_PNG = 'SignaturePng';

  const [courierRef, courierFont] = pdfDoc.embedStandardFont(
    StandardFonts.Courier,
  );


  const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.testSignaturePngBytes);
  const pages = pdfDoc.getPages();

  var postalVoteOptionIndefintiely = '';
  var postalVoteOptionDate = '';
  var postalVoteOptionPeriod = '';
  //setup a few tick boxes 'X'
  if (userData.postalVoteOption === 'indefintiely'){
    postalVoteOptionIndefintiely = 'X';
  }
  else if(userData.postalVoteOption === 'date'){
    postalVoteOptionDate = 'X';
  }
  else if(userData.postalVoteOption === 'period'){
    postalVoteOptionPeriod = 'X';
  }


  



  const existingPage2 = pages[1]
    .addFontDictionary(COURIER_FONT, courierRef)
    .addImageObject(SIGNATURE_PNG, SignaturePngRef);

  const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.1;
  const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.1;

  const newContentStream = pdfDoc.createContentStream(
    drawImage(SIGNATURE_PNG, {
      x: 332,
      y: 172,
      width: SIGNATURE_PNG_WIDTH,
      height: SIGNATURE_PNG_HEIGHT,
    }),
    drawText(courierFont.encodeText(userData.surname), {
      x: 55,
      y: 625,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstName), {
      x: 55,
      y: 585,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.firstLineAddress), {
      x: 55,
      y: 542,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.secondLineAddress), {
      x: 55,
      y: 521,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.city), {
      x: 55,
      y: 501,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.postcode), {
      x: 197,
      y: 481,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(postalVoteOptionIndefintiely), {
      x: 48,
      y: 258,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(postalVoteOptionDate), {
      x: 50,
      y: 245,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(postalVoteOptionPeriod), {
      x: 59,
      y: 781,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[0]), {
      x: 457,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[1]), {
      x: 481,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[2]), {
      x: 506,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[3]), {
      x: 530,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[5]), {
      x: 393,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[6]), {
      x: 418,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[8]), {
      x: 332,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.dateOfBirth[9]), {
      x: 358,
      y: 311,
      font: COURIER_FONT,
      size: 16,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[0]), {
      x: 473,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[1]), {
      x: 488,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[2]), {
      x: 503,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[3]), {
      x: 518,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[5]), {
      x: 437,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[6]), {
      x: 452,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[8]), {
      x: 399,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[9]), {
      x: 415,
      y: 54,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),

  );

  existingPage2.addContentStreams(pdfDoc.register(newContentStream));


  // const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
  // const outputDir = `${__dirname}/../output`;
  // const filePath = `${outputDir}/signPostalForm.pdf`;
  // if (!fs.existsSync(outputDir)){
  //   fs.mkdirSync(outputDir);
  // }
  // fs.writeFileSync(filePath, pdfBytes);

  const pdfBase64 = Buffer.from(PDFDocumentWriter.saveToBytes(pdfDoc)).toString('base64');
  return pdfBase64;
}

module.exports = signBasicForm;
