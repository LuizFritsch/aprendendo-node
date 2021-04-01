var pdf = require("html-pdf");
class PdfWriter {

    static WritePdf(filename, html) {
        pdf.create(html, {}).toFile(filename, () => {});
    }

}

module.exports = PdfWriter;