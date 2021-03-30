const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/categories", (req, res) => {
    res.send("rota cat")
});

/**
 * route to view add categorie
 */
router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
});

/**
 * route to view all categories
 */
router.get("/admin/categories/", (req, res) => {
    Category.findAll().then(categorias => {
        res.render("admin/categories/index", { categories: categorias })
    });
});

/**
 * Route to insert a categorie
 */
router.post("/admin/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() => { res.redirect("/admin/categories") });
    } else {
        res.redirect("/admin/categories/new")
    }
});

/**
 * Route to delete a categorie
 */
router.post("/admin/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => { res.redirect("/admin/categories") });

        } else { //if id not numeric
            res.redirect("/admin/categories/")
        }
    } else { // if id null
        res.redirect("/admin/categories/new")
    }
});

/**
 * rout view edit category
 */
router.get("/admin/categories/edit/:id", (req, res) => {
    var id = req.params.id;

    if (isNaN(id)) {
        res.redirect("/admin/categories");
    }
    Category.findByPk(id).then(category => {
        if (category != undefined) {
            res.render("admin/categories/edit", { category: category });
        } else {
            res.redirect("/admin/categories");
        }
    }).catch(erro => {
        //console.log("erro: " + erro)
        res.redirect("/admin/categories");
    });
});

router.post("/admin/categories/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    Category.update({ title: title, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/categories");
    });
});

module.exports = router;