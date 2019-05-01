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

  const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.09;
  const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.09;

  
  var movedHouseYes = '';
  var movedHouseNo = 'X';
  //setup a few tick boxes 'X'
  if (userData.movedHouse){
    movedHouseYes = 'X';
    movedHouseNo = '';
  }

  var otherAddressYes = '';
  var otherAddressNo = 'X';
  if (userData.differentAddress){
    otherAddressYes = 'X';
    otherAddressNo = '';
  }


  var registeredAsOverseasVoterYes = '';
  var registeredAsOverseasVoterNo = 'X';
  if (userData.registeredAsOverseasVoter){
    registeredAsOverseasVoterYes = 'X';
    registeredAsOverseasVoterNo = '';
  }



  const newContentStream1 = pdfDoc.createContentStream(
    drawText(courierFont.encodeText(userData.surname), {
      x: 180,
      y: 534,
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
    drawText(courierFont.encodeText(userData.email), {
      x: 180,
      y: 393,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(otherAddressNo), {
      x: 213,
      y: 453,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(otherAddressYes), {
      x: 257,
      y: 453,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.nationality), {
      x: 55,
      y: 322,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(movedHouseNo), {
      x: 50,
      y: 245,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(movedHouseYes), {
      x: 96,
      y: 245,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.oldAddressFirstLineAddress), {
      x: 55,
      y: 210,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.oldAddressSecondLineAddress), {
      x: 55,
      y: 190,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.oldAddressCity), {
      x: 55,
      y: 170,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.oldAddressPostcode), {
      x: 355,
      y: 172,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(registeredAsOverseasVoterNo), {
      x: 486,
      y: 151,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(registeredAsOverseasVoterYes), {
      x: 530,
      y: 151,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
  );


  existingPage1.addContentStreams(pdfDoc.register(newContentStream1));

  //const ninNoSpaces = userData.nin.replace(/ /g,'');
  const ninNoSpaces = userData.nin.replace(/\s+/g, '');

  const newContentStream2 = pdfDoc.createContentStream(
    drawImage(SIGNATURE_PNG, {
      x: 120,
      y: 105,
      width: SIGNATURE_PNG_WIDTH,
      height: SIGNATURE_PNG_HEIGHT,
    }),
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
    drawText(courierFont.encodeText(userData.currentDate[0]), {
      x: 432,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[1]), {
      x: 445,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[2]), {
      x: 460,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[3]), {
      x: 475,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[5]), {
      x: 390,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[6]), {
      x: 405,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[8]), {
      x: 347,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.currentDate[9]), {
      x: 362,
      y: 125,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText('X'), {
      x: 475,
      y: 258,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
    drawText(courierFont.encodeText(userData.previousName), {
      x: 56,
      y: 459,
      font: COURIER_FONT,
      size: 12,
      colorRgb: [0, 0, 0],
    }),
  );

  existingPage2.addContentStreams(pdfDoc.register(newContentStream2));



  // const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);
  // const outputDir = `${__dirname}/../output`;
  // const filePath = `${outputDir}/signBasicForm.pdf`;
  // if (!fs.existsSync(outputDir)){
  //   fs.mkdirSync(outputDir);
  // }
  // fs.writeFileSync(filePath, pdfBytes);

  const pdfBase64 = Buffer.from(PDFDocumentWriter.saveToBytes(pdfDoc)).toString('base64');
  return pdfBase64;
}

module.exports = signBasicForm;