var exports = module.exports = {};


const fs = require('fs');
const {
  PDFDocumentFactory,
  PDFDocumentWriter,
  StandardFonts,
  drawText,
  drawImage,
  drawRectangle,
} = require('pdf-lib');




var attachments = [];

exports.signRegisterEnglandWalesPdf = function()
{
   /* ========================= 1. Read in Assets ============================== */
    // This step is platform dependent. Since this is a Node script, we can just
    // read the assets in from the file system. But this approach wouldn't work
    // in a browser. Instead, you might need to make HTTP requests for the assets.
    const assets = {
      ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
      testSignaturePngBytes: fs.readFileSync('./assets/signature-test.png'),
      euCitzienEnglishPdfBytes: fs.readFileSync('./assets/Register_to_vote_if_you_re_living_in_England_or_Wales.pdf'),
    };

    const userData = {
      firstName: 'Tom',
      surName: 'Miller',
      addressLine1: 'Roan Court 1',
      addressLine2: 'Roan Court 2',
      addressLine3: 'Roan Court 3',
      postCode: 'SE10 3RT',
      citizenCountry : 'Spain'
    }

    /* ================== 2. Load and Setup the PDF Document ==================== */
    // This step is platform independent. The same code can be used in any
    // JavaScript runtime (e.g. Node, the browser, or React Native).

    // Here we load the tax voucher PDF file into a PDFDocument object.
    const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

    // Let's define some constants that we can use to reference the fonts and
    // images later in the script.
    const COURIER_FONT = 'Courier';
    const UBUNTU_FONT = 'Ubuntu';
    const SIGNATURE_PNG = 'SignaturePng';

    // Now we embed a standard font (Courier), and the custom TrueType font we
    // read in (Ubuntu-R).
    const [courierRef, courierFont] = pdfDoc.embedStandardFont(
      StandardFonts.Courier,
    );
    const [ubuntuRef, ubuntuFont] = pdfDoc.embedNonstandardFont(
      assets.ubuntuFontBytes,
    );

    // Next, we embed the PNG image we read in.
    const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.testSignaturePngBytes);

    /* ====================== 3. Modify Existing Page =========================== */
    // This step is platform independent. The same code can be used in any
    // JavaScript runtime (e.g. Node, the browser, or React Native).

    // Here we get an array of PDFPage objects contained in the `pdfDoc`. In this
    // case, the tax voucher we loaded has a single page. So this will be an array
    // of length one.
    const pages = pdfDoc.getPages();
    // Now we'll add the Courier font dictionary and Mario PNG image object that we
    // embedded into the document earlier.
    const existingPage1 = pages[0]
      .addFontDictionary(COURIER_FONT, courierRef)
      .addImageObject(SIGNATURE_PNG, SignaturePngRef);

      const existingPage2 = pages[1]
      .addFontDictionary(COURIER_FONT, courierRef)
      .addImageObject(SIGNATURE_PNG, SignaturePngRef);

    // Let's define some constants for the PNG image's width and height. We'll use
    // the dimensions returned as the second element of the tuple returned by
    // `pdfDoc.embedPNG` when we embedded the image in the document.
    //
    // Since the image is quite large relative to our page size, we'll scale both
    // the width and height down to 15% of their original size.
    const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.15;
    const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.15;

    // Here, we define a new "content stream" for the page. A content stream is
    // simply a sequence of PDF operators that define what we want to draw on the
    // page.
    const newContentStream1 = pdfDoc.createContentStream(
      // `drawImage` is a "composite" PDF operator that lets us easily draw an image
      // on a page's content stream. "composite" just means that it is composed of
      // several lower-level PDF operators. Usually, you'll want to work with
      // composite operators - they make things a lot easier! The naming convention
      // for composite operators is "draw<thing_being_drawn>".
      //
      // Here we draw the image of Mario on the page's content stream. We'll draw
      // him centered horizontally in the top half of the page.
      
      drawImage(SIGNATURE_PNG, {
        x: 400,
        y: 50,
        width: SIGNATURE_PNG_WIDTH,
        height: SIGNATURE_PNG_HEIGHT,
      }),




      drawText(courierFont.encodeText(userData.surName),
        {
          x: 180,
          y: 533,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.firstName),
        {
          x: 180,
          y: 559,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine1),
        {
          x: 180,
          y: 507,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine2),
        {
          x: 180,
          y: 488,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine3),
        {
          x: 180,
          y: 470,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.postCode),
        {
          x: 405,
          y: 470,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.citizenCountry),
        {
          x: 415,
          y: 677,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),


    );

    // Here we (1) register the content stream to the PDF document, and (2) add the
    // reference to the registered stream to the page's content streams.
    existingPage1.addContentStreams(pdfDoc.register(newContentStream1));

    const newContentStream2 = pdfDoc.createContentStream(
      // `drawImage` is a "composite" PDF operator that lets us easily draw an image
      // on a page's content stream. "composite" just means that it is composed of
      // several lower-level PDF operators. Usually, you'll want to work with
      // composite operators - they make things a lot easier! The naming convention
      // for composite operators is "draw<thing_being_drawn>".
      //
      // Here we draw the image of Mario on the page's content stream. We'll draw
      // him centered horizontally in the top half of the page.
      
      drawImage(SIGNATURE_PNG, {
        x: 400,
        y: 50,
        width: SIGNATURE_PNG_WIDTH,
        height: SIGNATURE_PNG_HEIGHT,
      }),




      drawText(courierFont.encodeText(userData.surName),
        {
          x: 50,
          y: 625,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.firstName),
        {
          x: 50,
          y: 585,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine1),
        {
          x: 50,
          y: 540,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine2),
        {
          x: 50,
          y: 521,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine3),
        {
          x: 50,
          y: 503,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.postCode),
        {
          x: 205,
          y: 480,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.citizenCountry),
        {
          x: 415,
          y: 677,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),


    );

    // Here we (1) register the content stream to the PDF document, and (2) add the
    // reference to the registered stream to the page's content streams.
    existingPage2.addContentStreams(pdfDoc.register(newContentStream2));   

    // Now we'll convert the `pdfDoc` to a `Uint8Array` containing the bytes of a
    // PDF document. This step serializes the document. You can still make changes
    // to the document after this step, but you'll have to call `saveToBytes` again
    // after doing so.
    //
    // The `Uint8Array` returned here can be used in a number of ways. What you do
    // with it largely depends on the JavaScript environment you're running in.
    const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);

    /* ========================== 7. Write PDF to File ========================== */
    // This step is platform dependent. Since this is a Node script, we can just
    // save the `pdfBytes` to the file system, where it can be opened with a PDF
    // reader.
    const filePath = `${__dirname}/modified.pdf`;
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`PDF file written to: ${filePath}`);

    attachments.push(pdfBytes);

}


function signPostalPdf()
{
   /* ========================= 1. Read in Assets ============================== */
    // This step is platform dependent. Since this is a Node script, we can just
    // read the assets in from the file system. But this approach wouldn't work
    // in a browser. Instead, you might need to make HTTP requests for the assets.
    const assets = {
      ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
      testSignaturePngBytes: fs.readFileSync('./assets/signature-test.png'),
      euCitzienEnglishPdfBytes: fs.readFileSync('./assets/Postal-vote-application-form.pdf'),
    };

    const userData = {
      firstName: 'Tom',
      surName: 'Miller',
      addressLine1: 'Roan Court 1',
      addressLine2: 'Roan Court 2',
      addressLine3: 'Roan Court 3',
      postCode: 'SE10 3RT',
      citizenCountry : 'Spain'
    }

    /* ================== 2. Load and Setup the PDF Document ==================== */
    // This step is platform independent. The same code can be used in any
    // JavaScript runtime (e.g. Node, the browser, or React Native).

    // Here we load the tax voucher PDF file into a PDFDocument object.
    const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

    // Let's define some constants that we can use to reference the fonts and
    // images later in the script.
    const COURIER_FONT = 'Courier';
    const UBUNTU_FONT = 'Ubuntu';
    const SIGNATURE_PNG = 'SignaturePng';

    // Now we embed a standard font (Courier), and the custom TrueType font we
    // read in (Ubuntu-R).
    const [courierRef, courierFont] = pdfDoc.embedStandardFont(
      StandardFonts.Courier,
    );
    const [ubuntuRef, ubuntuFont] = pdfDoc.embedNonstandardFont(
      assets.ubuntuFontBytes,
    );

    // Next, we embed the PNG image we read in.
    const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.testSignaturePngBytes);

    /* ====================== 3. Modify Existing Page =========================== */
    // This step is platform independent. The same code can be used in any
    // JavaScript runtime (e.g. Node, the browser, or React Native).

    // Here we get an array of PDFPage objects contained in the `pdfDoc`. In this
    // case, the tax voucher we loaded has a single page. So this will be an array
    // of length one.
    const pages = pdfDoc.getPages();
    // Now we'll add the Courier font dictionary and Mario PNG image object that we
    // embedded into the document earlier.
    const existingPage = pages[1]
      .addFontDictionary(COURIER_FONT, courierRef)
      .addImageObject(SIGNATURE_PNG, SignaturePngRef);

    // Let's define some constants for the PNG image's width and height. We'll use
    // the dimensions returned as the second element of the tuple returned by
    // `pdfDoc.embedPNG` when we embedded the image in the document.
    //
    // Since the image is quite large relative to our page size, we'll scale both
    // the width and height down to 15% of their original size.
    const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.15;
    const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.15;

    // Here, we define a new "content stream" for the page. A content stream is
    // simply a sequence of PDF operators that define what we want to draw on the
    // page.
    const newContentStream = pdfDoc.createContentStream(
      // `drawImage` is a "composite" PDF operator that lets us easily draw an image
      // on a page's content stream. "composite" just means that it is composed of
      // several lower-level PDF operators. Usually, you'll want to work with
      // composite operators - they make things a lot easier! The naming convention
      // for composite operators is "draw<thing_being_drawn>".
      //
      // Here we draw the image of Mario on the page's content stream. We'll draw
      // him centered horizontally in the top half of the page.
      
      drawImage(SIGNATURE_PNG, {
        x: 400,
        y: 50,
        width: SIGNATURE_PNG_WIDTH,
        height: SIGNATURE_PNG_HEIGHT,
      }),




      drawText(courierFont.encodeText(userData.surName),
        {
          x: 50,
          y: 625,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.firstName),
        {
          x: 50,
          y: 585,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine1),
        {
          x: 50,
          y: 540,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine2),
        {
          x: 50,
          y: 521,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine3),
        {
          x: 50,
          y: 503,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.postCode),
        {
          x: 205,
          y: 480,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.citizenCountry),
        {
          x: 415,
          y: 677,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),


    );

    // Here we (1) register the content stream to the PDF document, and (2) add the
    // reference to the registered stream to the page's content streams.
    existingPage.addContentStreams(pdfDoc.register(newContentStream));

    

    // Now we'll convert the `pdfDoc` to a `Uint8Array` containing the bytes of a
    // PDF document. This step serializes the document. You can still make changes
    // to the document after this step, but you'll have to call `saveToBytes` again
    // after doing so.
    //
    // The `Uint8Array` returned here can be used in a number of ways. What you do
    // with it largely depends on the JavaScript environment you're running in.
    const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);

    /* ========================== 7. Write PDF to File ========================== */
    // This step is platform dependent. Since this is a Node script, we can just
    // save the `pdfBytes` to the file system, where it can be opened with a PDF
    // reader.
    const filePath = `${__dirname}/modified.pdf`;
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`PDF file written to: ${filePath}`);

    attachments.push(pdfBytes);
}


function signEuPdf()
{
    /* ========================= 1. Read in Assets ============================== */
    // This step is platform dependent. Since this is a Node script, we can just
    // read the assets in from the file system. But this approach wouldn't work
    // in a browser. Instead, you might need to make HTTP requests for the assets.
    const assets = {
      ubuntuFontBytes: fs.readFileSync('./assets/ubuntu-fonts/Ubuntu-R.ttf'),
      testSignaturePngBytes: fs.readFileSync('./assets/signature-test.png'),
      euCitzienEnglishPdfBytes: fs.readFileSync('./assets/EU-citizen-European-Parliament-voter-registration-form-English.pdf'),
    };

    const userData = {
      firstName: 'Tom',
      surName: 'Miller',
      addressLine1: 'Roan Court 1',
      addressLine2: 'Roan Court 2',
      addressLine3: 'Roan Court 3',
      postCode: 'SE10 3RT',
      citizenCountry : 'Spain'
    }

    /* ================== 2. Load and Setup the PDF Document ==================== */
    // This step is platform independent. The same code can be used in any
    // JavaScript runtime (e.g. Node, the browser, or React Native).

    // Here we load the tax voucher PDF file into a PDFDocument object.
    const pdfDoc = PDFDocumentFactory.load(assets.euCitzienEnglishPdfBytes);

    // Let's define some constants that we can use to reference the fonts and
    // images later in the script.
    const COURIER_FONT = 'Courier';
    const UBUNTU_FONT = 'Ubuntu';
    const SIGNATURE_PNG = 'SignaturePng';

    // Now we embed a standard font (Courier), and the custom TrueType font we
    // read in (Ubuntu-R).
    const [courierRef, courierFont] = pdfDoc.embedStandardFont(
      StandardFonts.Courier,
    );
    const [ubuntuRef, ubuntuFont] = pdfDoc.embedNonstandardFont(
      assets.ubuntuFontBytes,
    );

    // Next, we embed the PNG image we read in.
    const [SignaturePngRef, SignaturePngDims] = pdfDoc.embedPNG(assets.testSignaturePngBytes);

    /* ====================== 3. Modify Existing Page =========================== */
    // This step is platform independent. The same code can be used in any
    // JavaScript runtime (e.g. Node, the browser, or React Native).

    // Here we get an array of PDFPage objects contained in the `pdfDoc`. In this
    // case, the tax voucher we loaded has a single page. So this will be an array
    // of length one.
    const pages = pdfDoc.getPages();
    // Now we'll add the Courier font dictionary and Mario PNG image object that we
    // embedded into the document earlier.
    const existingPage = pages[1]
      .addFontDictionary(COURIER_FONT, courierRef)
      .addImageObject(SIGNATURE_PNG, SignaturePngRef);

    // Let's define some constants for the PNG image's width and height. We'll use
    // the dimensions returned as the second element of the tuple returned by
    // `pdfDoc.embedPNG` when we embedded the image in the document.
    //
    // Since the image is quite large relative to our page size, we'll scale both
    // the width and height down to 15% of their original size.
    const SIGNATURE_PNG_WIDTH = SignaturePngDims.width * 0.15;
    const SIGNATURE_PNG_HEIGHT = SignaturePngDims.height * 0.15;

    // Here, we define a new "content stream" for the page. A content stream is
    // simply a sequence of PDF operators that define what we want to draw on the
    // page.
    const newContentStream = pdfDoc.createContentStream(
      // `drawImage` is a "composite" PDF operator that lets us easily draw an image
      // on a page's content stream. "composite" just means that it is composed of
      // several lower-level PDF operators. Usually, you'll want to work with
      // composite operators - they make things a lot easier! The naming convention
      // for composite operators is "draw<thing_being_drawn>".
      //
      // Here we draw the image of Mario on the page's content stream. We'll draw
      // him centered horizontally in the top half of the page.
      
      drawImage(SIGNATURE_PNG, {
        x: 400,
        y: 50,
        width: SIGNATURE_PNG_WIDTH,
        height: SIGNATURE_PNG_HEIGHT,
      }),




      drawText(courierFont.encodeText(userData.surName),
        {
          x: 50,
          y: 677,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.firstName),
        {
          x: 50,
          y: 640,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine1),
        {
          x: 50,
          y: 540,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine2),
        {
          x: 50,
          y: 523,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.addressLine3),
        {
          x: 50,
          y: 506,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.postCode),
        {
          x: 205,
          y: 488,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),
      drawText(courierFont.encodeText(userData.citizenCountry),
        {
          x: 415,
          y: 677,
          font: COURIER_FONT,
          size: 12,
          colorRgb: [0, 0, 0],
        },
      ),


    );

    // Here we (1) register the content stream to the PDF document, and (2) add the
    // reference to the registered stream to the page's content streams.
    existingPage.addContentStreams(pdfDoc.register(newContentStream));

    

    // Now we'll convert the `pdfDoc` to a `Uint8Array` containing the bytes of a
    // PDF document. This step serializes the document. You can still make changes
    // to the document after this step, but you'll have to call `saveToBytes` again
    // after doing so.
    //
    // The `Uint8Array` returned here can be used in a number of ways. What you do
    // with it largely depends on the JavaScript environment you're running in.
    const pdfBytes = PDFDocumentWriter.saveToBytes(pdfDoc);

    /* ========================== 7. Write PDF to File ========================== */
    // This step is platform dependent. Since this is a Node script, we can just
    // save the `pdfBytes` to the file system, where it can be opened with a PDF
    // reader.
    const filePath = `${__dirname}/modified.pdf`;
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`PDF file written to: ${filePath}`);

    attachments.push(pdfBytes);

}

function sendEmail()
{

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: 'recipient@example.org',
      from: 'sender@example.org',
      subject: 'Hello attachment',
      html: '<p>Here’s an attachment for you!</p>',
      attachments: [
        {
          content: 'Some base 64 encoded attachment content',
          filename: 'some-attachment.txt',
          type: 'plain/text',
          disposition: 'attachment',
          contentId: 'mytext'
        },
      ],
    };

}
