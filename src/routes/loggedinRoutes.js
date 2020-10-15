const express = require('express');
const loggedinRouter= express.Router();

const Data =  require("../model/mongoosedata.js")

function router(exit){


    loggedinRouter.get("/",(req,res)=>{
        var title = "Bibliothek";
        var nav = [{links:"/loggedin/books",name:"Books"},{links:"/loggedin/authors",name:"Authors"}]
        Data.bookData.find().then((books)=>{
            res.render("loggedin",{nav,title,books,exit});
        })
        
        
    })




// Books Routers

    loggedinRouter.get("/books",(req,res)=>{
        var title = "Books";
        var nav = [{links:"/loggedin",name:"Home"},{links:"/loggedin/authors",name:"Authors"}]
        var entry = exit;
        var user = "loggedin"
        Data.bookData.find().then((books)=>{
            res.render("books",{nav,title,books,entry,user});
        })    
    })

    loggedinRouter.get("/books/:id", (req,res)=>{
        const id = req.params.id;
        var entry =  exit;
        var nav = [{links:"/loggedin/books",name:"Books"},{links:"/loggedin/authors",name:"Authors"}]
        var  title= "Book Spotlight";
        var user = "loggedin"
        Data.bookData.findOne({_id:id}).then((onebook)=>{
            res.render("onebook",{nav,entry,title,onebook,user});
        })
    })

// Books Routers Ends



// Authors Routers

    loggedinRouter.get("/authors",(req,res)=>{
        var title = "Authors";
        var nav = [{links:"/loggedin",name:"Home"},{links:"/loggedin/books",name:"Books"}]
        var entry = exit;
        var user = "loggedin"
        Data.authorData.find().then((authors)=>{
            res.render("authors",{nav,title,authors,entry,user});
        })
        
        
    })

    loggedinRouter.get("/authors/:id", (req,res)=>{
        const id= req.params.id;
        var entry=exit;
        var nav = [{links:"/loggedin/books",name:"Books"},{links:"/loggedin/authors",name:"Authors"}]
        var  title= "Author Spotlight";
        var user = "loggedin"
        Data.authorData.findOne({_id:id}).then((oneauthor)=>{
            res.render("oneauthor.ejs", {nav,entry,title,oneauthor,user})
        })
        
    })


// Authors Routers ends


    return loggedinRouter
    
}


module.exports= router;
