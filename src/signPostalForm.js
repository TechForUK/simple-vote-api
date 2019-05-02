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

  if (userData.postalVoteOption === 'indefintiely'){
    postalVoteOptionIndefintiely = 'X';
  }

  const existingPage2 = pages[1]
    .addFontDictionary(COURIER_FONT, courierRef)
    .addImageObject(SIGNATURE_PNG, SignaturePngRef);

  const SIGNATURE_PNG_WIDTH = SignaturePngDims.width / (SignaturePngDims.height / 60);
  const SIGNATURE_PNG_HEIGHT = 60;

  const newContentStream = pdfDoc.createContentStream(
    drawImage(SIGNATURE_PNG, {
      x: 360,
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
    drawText(courierFont.encodeText(userData.email), {
      x: 55,
      y: 398,
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


  if(userData.postalVoteOption === 'specificElection'){
    const newContentStream2 = pdfDoc.createContentStream(
      drawText(courierFont.encodeText('X'), {
        x: 48,
        y: 233,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[0]), {
        x: 139,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[1]), {
        x: 155,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[2]), {
        x: 170,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[3]), {
        x: 184,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[5]), {
        x: 101,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[6]), {
        x: 116,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[8]), {
        x: 66,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteElectionDate[9]), {
        x: 81,
        y: 215,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
    );
    existingPage2.addContentStreams(pdfDoc.register(newContentStream2));
  }
  else if(userData.postalVoteOption === 'timePeriod'){
    const newContentStream2 = pdfDoc.createContentStream(
      drawText(courierFont.encodeText('X'), {
        x: 48,
        y: 179,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[0]), {
        x: 171,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[1]), {
        x: 186,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[2]), {
        x: 201,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[3]), {
        x: 215,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[5]), {
        x: 135,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[6]), {
        x: 150,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[8]), {
        x: 99,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteFrom[9]), {
        x: 114,
        y: 159,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[0]), {
        x: 171,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[1]), {
        x: 186,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[2]), {
        x: 201,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[3]), {
        x: 215,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[5]), {
        x: 135,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[6]), {
        x: 150,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[8]), {
        x: 99,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
      drawText(courierFont.encodeText(userData.postalVoteTo[9]), {
        x: 114,
        y: 125,
        font: COURIER_FONT,
        size: 12,
        colorRgb: [0, 0, 0],
      }),
    );
    existingPage2.addContentStreams(pdfDoc.register(newContentStream2));

  }


  // For testing:
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
