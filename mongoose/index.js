const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/aprendendoMongo", { useNewUrlParser: true, useUnifiedTopology: true });
const articleModel = require("./Article");
//monto um esquema
const Article = mongoose.model("Article", articleModel);
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const artigo = new Article({
    title: gera_lorem().generateWords(3),
    author: "Luiz fritsch",
    body: gera_lorem().generateParagraphs(3),
    special: true,
    resume: {
        content: gera_lorem().generateParagraphs(3),
        author: "Luiz fritsch"
    }
});

function gera_lorem() {
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 4
        },
        wordsPerSentence: {
            max: 16,
            min: 4
        }
    });
    return lorem;
}

async function inserir(artigo) {
    try {
        const response = await artigo.save();
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

async function find() {
    try {
        var articles = await Article.find();
        console.log(articles);
    } catch (error) {
        console.log(error);
    }
}

async function findByFilter(filter) {
    try {
        var articles = await Article.find(filter);
        console.log(articles);
    } catch (error) {
        console.log(error);
    }
}

async function findOneByFilter(filter) {
    try {
        var articles = await Article.findOne(filter);
        console.log(articles);
    } catch (error) {
        console.log(error);
    }
}

async function deleteByID(id) {
    try {
        var articles = await Article.findByIdAndDelete(id);
        console.log(articles);
    } catch (error) {
        console.log(error);
    }
}

async function updateByID(id, data) {
    try {
        var articles = await Article.findByIdAndUpdate(id, data);
        console.log(articles);
    } catch (error) {
        console.log(error);
    }
}

/**
 * 606cac8d327da61d2c452490
 * Insert random article on mongo
 */
//inserir(artigo);

/**
 * list all articles on db
 */
//find()

/**
 * list by filter
 */
//findByFilter({ '_id': '606cac8d327da61d2c452490', author: "Luiz fritsch" });

/**
 * list one by filter
 */
//findOneByFilter({ '_id': '606cac18e0dfd33eb87ac4e7', author: "Luiz fritsch" });

/**
 * Delete one by id
 */
//deleteByID('606cac8d327da61d2c452490');

/**
 * update by id
 */
//updateByID('606cac18e0dfd33eb87ac4e7', { title: "vue do zero" });