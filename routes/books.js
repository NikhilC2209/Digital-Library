const express = require("express");
const router = express.Router();
const Books = require("../models/Book.js");

router.get("/", (req, res) => {
    res.render("Books/home_page");
});

router.get("/all", async (req,res) =>  {
    try {
        const allBooks = await Books.find({});
        res.render("Books/List.ejs", {books: allBooks});
    }
    catch {
        res.redirect("/");
    }
})

router.get("/find", async (req,res) =>  {
    var searchBar = {};
    if (req.query.name != null && req.query.name !== "") {
        searchBar.Name = new RegExp(req.query.name, "i");
        console.log("Working");
    }
    try {
        const findBooks = await Books.find(searchBar);
        res.render("Books/find.ejs", {booksy: findBooks, searchBar: req.query });
        console.log(findBooks);
    }
    catch(error) {
        console.log(error);
        res.redirect("/");
    }
})

router.get("/new", (req,res) => {
    res.render("Books/new_page.ejs");
})

router.post("/post", async (req,res) => {
    const Book = new Books({
        Name: req.body.name,
        Author: req.body.author
    });
    try {
        const newBook = await Book.save();
        res.redirect("/books/find");
    }
    catch (error){
       // res.render("Books/new_page", {
       //     book: book,
       //     errorMessage: "Error creating Book"
       // })
       console.log(error);
       res.render("Books/e.ejs");
    }
});

module.exports = router;    