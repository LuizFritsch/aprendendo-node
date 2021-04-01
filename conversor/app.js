const Processor = require("./Processor");

var Reader = require("./Reader");
var leitor = new Reader();

var Table = require("./Table");
var HtmlParser = require("./HtmlParser")

const Writer = require("./Writer");
var escritor = new Writer();


const PdfWriter = require("./PdfWriter");

async function main() {
    try {
        var dadosLeitura = await leitor.Read("./planilha.csv");
        //console.log(dadosLeitura);
        var dadosProcessados = Processor.Process(dadosLeitura);
        var usuarios = new Table(dadosProcessados);
        //console.log(usuarios.header);
        //console.log(usuarios.rows);
        //console.log(usuarios.RowCount);
        //console.log(usuarios)
        var html = await HtmlParser.Parse(usuarios);
        //console.log(html)
        //escritor.Write(Date.now() + ".html", html);
        PdfWriter.WritePdf(Date.now() + ".pdf", html)
    } catch (error) {
        console.log(error);
    }
}

main()