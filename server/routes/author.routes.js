const AuthorController = require("../controllers/author.controller")




module.exports = app => {
    app.get("/api/authors", AuthorController.findAllAuthors)
    app.get("/api/authors/:id", AuthorController.findAuthorById)
    app.patch("/api/authors/:id", AuthorController.updateAuthor)
    app.post("/api/authors", AuthorController.createAuthor)
    app.delete("/api/authors/:id", AuthorController.deleteAuthor)
}