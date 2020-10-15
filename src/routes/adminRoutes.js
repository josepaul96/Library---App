const express = require('express');
const adminRouter = express.Router();
const Data =  require("../model/mongoosedata.js")
const path = require("path")


var exit = [{links:"/",name:"Log Out"}]


// Admin Home


adminRouter.get("/",(req,res)=>{
    var nav = [{links:"/admin/books",name:"Books"},{links:"/admin/authors",name:"Authors"}]
    var  title= "Welcome Admin";
    var user = "admin";
    Data.bookData.find().then((books)=>{
        res.render("loggedin",{nav,title,books,exit,user});
    })
})



// Books


adminRouter.get("/books",(req,res)=>{
    var title = "Books";
    var nav = [{links:"/admin",name:"Home"},{links:"/admin/authors",name:"Authors"},{links:"/admin/addBook",name:"Add New Book"}]
    var entry = exit;
    var user = "admin"
    Data.bookData.find().then((books)=>{
        res.render("books",{nav,title,books,entry,user});
    })
    
    
})

adminRouter.get("/books/:id", (req,res)=>{
    const id = req.params.id;
    var entry =  exit;
    var nav = [{links:"/admin/books",name:"Books"},{links:"/admin/editBook/"+`${id}`,name:"Edit"},{links:"/admin/deleteBook/"+`${id}`,name:"Delete"}]
    var  title= "Book Spotlight";
    var user = "admin";
    
    Data.bookData.findOne({_id:id}).then((onebook)=>{
        res.render("onebook",{nav,entry,title,onebook,user});
    })
})


// Edit Book


adminRouter.get("/editBook/:id",(req,res)=>{
    const id =req.params.id;
    var entry=exit;
    var nav = [{links:"/admin/books/"+`${id}`, name:"Back"},{links:"/admin",name:"Home"}]
    var title= "Edit Book";
    var user = "admin";
    res.render("addbook",{nav,entry,title,user})
})




adminRouter.post("/editBook/:id",(req,res)=>{
    if(req.files){
        var file =req.files.bookImage;
        var filename = file.name
        var Path = path.join(__dirname, '../../',"/public/images",filename)
        
        
        file.mv(Path,function(err){
            if(err){
                console.log(err)
            }
        })
        }


    const id =req.params.id;
    Data.bookData.updateOne({_id:id},{title:req.body.bookName,
        author:req.body.bookAuthor,
        genre:req.body.bookGenre,
        image:"/public/images/"+filename},(err,response)=>{
            if(err){
                res.send(err)
            }
            else{
                res.redirect("/admin/books")
            }
        })
    })
 

// Delete Book 
  
    adminRouter.get("/deleteBook/:id",(req,res)=>{
        const id =req.params.id;
        Data.bookData.deleteOne({_id:id}).then(()=>{
            res.redirect("/admin/books")
        })
        
    })


// Add Book


adminRouter.get("/addBook",(req,res)=>{
    var nav = [{links:"/admin",name:"Home"},{links:"/admin/books",name:"Books"}]
    var  title= "Add a new book";
    res.render("addbook",{nav,exit,title});
})

adminRouter.post("/addBook",(req,res)=>{
    if(req.files){
        var file =req.files.bookImage;
        var filename = file.name
        var Path = path.join(__dirname, '../../',"/public/images",filename)
        
        
        file.mv(Path,function(err){
            if(err){
                console.log(err)
            }
        })
        }



    var item = {
        title:req.body.bookName,
        author:req.body.bookAuthor,
        genre:req.body.bookGenre,
        image: "/public/images/"+filename
    }    
        var newBook = Data.bookData(item);
        newBook.save();
        res.redirect("/admin/books") 
    }
)







// Authors

adminRouter.get("/authors",(req,res)=>{
    var title = "Authors";
    var nav = [{links:"/admin",name:"Home"},{links:"/admin/books",name:"Books"},{links:"/admin/addAuthor", name:"Add Author"}]
    var entry = exit;
    var user = "admin"
    Data.authorData.find().then((authors)=>{
        res.render("authors",{nav,title,authors,entry,user});
    })
})

adminRouter.get("/authors/:id", (req,res)=>{
    const id= req.params.id;
    Data.authorData.findOne({_id:id}).then((oneauthor)=>{
        var entry=exit;
        var nav = [{links:"/admin/authors",name:"Authors"},{links:"/admin/editAuthor/"+`${id}`,name:"Edit"},{links:"/admin/deleteAuthor/"+`${id}`,name:"Delete"}]
        var title= "Author Spotlight";
        var user = "admin";
        res.render("oneauthor.ejs", {nav,entry,title,oneauthor,user})
    })
})


// Add Author

adminRouter.get("/addAuthor",(req,res)=>{
    var nav = [{links:"/admin",name:"Home"},{links:"/admin/author",name:"Authors"}]
    var  title= "Add a new author";
    res.render("modifyauthor",{nav,exit,title});
})



adminRouter.post("/addAuthor",(req,res)=>{
    if(req.files){
        var file =req.files.authorImage;
        var filename = file.name
        var Path = path.join(__dirname, '../../',"/public/images",filename)
        
        
        file.mv(Path,function(err){
            if(err){
                console.log(err)
            }
        })
        }

    var item = {name:req.body.authorName,
    DOB:req.body.authorDOB,
    genre:req.body.authorGenre,
    image:"/public/images/"+filename,
    books:{
        book1: req.body.authorBook1,
        book2: req.body.authorBook2,
    }}
        var newAuthor = Data.authorData(item);
        newAuthor.save();
        res.redirect("/admin/authors") 
    }
)

// Edit Author


adminRouter.get("/editAuthor/:id",(req,res)=>{
    const id =req.params.id;
    var entry=exit;
    var nav = [{links:"/admin/authors/"+`${id}`, name:"Back"},{links:"/admin",name:"Home"}]
    var title= "Edit Author";
    var user = "admin";
    res.render("modifyauthor",{nav,entry,title,user})
})


adminRouter.post("/editAuthor/:id",(req,res)=>{
    if(req.files){
        var file =req.files.authorImage;
        var filename = file.name
        var Path = path.join(__dirname, '../../',"/public/images",filename)
        
        
        file.mv(Path,function(err){
            if(err){
                console.log(err)
            }
        })
        }


    const id =req.params.id;
    Data.authorData.updateOne({_id:id},{name:req.body.authorName,
        DOB:req.body.authorDOB,
        genre:req.body.authorGenre,
        image: "/public/images/"+filename,
        books:{
            book1: req.body.authorBook1,
            book2: req.body.authorBook2,
        }  
     }).then(()=>{
            res.redirect("/admin/authors") 
        })
    }
)


// Delete Author


adminRouter.get("/deleteAuthor/:id",(req,res)=>{
    const id =req.params.id;
    Data.authorData.deleteOne({_id:id}).then(()=>{
        res.redirect("/admin/authors")
    })
    
})

module.exports = adminRouter;