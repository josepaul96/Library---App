const express = require('express');
const Data = require("./src/model/mongoosedata")
const app = express();
const upload = require("express-fileupload");

var entry=[
    {links:"/signin",name:"Sign In"},
    {links:"/signup",name:"Sign Up"}

]
var exit = [{links:"/",name:"Log Out"}]
app.use(upload());
const adminRouter = require(__dirname + "/src/routes/adminRoutes");
const loggedinRouter = require(__dirname + "/src/routes/loggedinRoutes")(exit);


app.set("view engine", "ejs");
app.set("views", __dirname+"/src/views")

app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/"))

app.use("/admin", adminRouter)
app.use("/loggedin", loggedinRouter)


// Initialise
var genesis = 0;

const firstTime = async()=>{
    
    var firstTimeBook= Data.bookData.find() 
    if(!firstTimeBook.length){
        var books=[
            {
                title:"Shantaram",
                author:"Gregory David Roberts",
                genre:"Drama",
                image:"/public/images/shantaram.jpg"
        
            },
            {
                title:"The Interpretation of Dreams",
                author:"Sigmund Freud",
                genre:"Psychology",
                image:"/public/images/Freud.jpg"
        
            }, 
            {
                title:"Thinking Fast and Slow",
                author:"Daniel Kahneman",
                genre:"Self-Help",
                image:"/public/images/Fast & Slow.jpg"
        
            }
          ] 
        
        books.forEach((book)=>{
          
           var deafultBook = Data.bookData(book);
           deafultBook.save();  
        
        })  
    }

    
    var firstTimeAuthor = Data.authorData.find() 
    if(!firstTimeAuthor.length){
        var authors=[
            {
                name:"Gregory David Roberts",
                DOB:"21 June 1952",
                genre:"Drama",
                books:{
                    book1: "Shantaram",
                    book2: "The Mountain Shadow"
                },
                image:"/public/images/GregoryDavid.jpeg"
            },
            {
                name:"Sigmund Freud",
                DOB:"6 May 1856",
                genre:"Psychology",
                books:{
                    book1: "The Interpretation of Dreams",
                    book2: "Beyond the Pleasure Principle"
                },
                image:"/public/images/SigmundFreud.jpg"
            },
            {
                name:"Daniel Kahneman",
                DOB:"5 March 1934",
                genre:"Psychology,Economics",
                books:{
                    book1: "Thinking, Fast and Slow",
                    book2: "Attention And Effort"
                },
                image:"/public/images/DanielK.jpg"
            }  
        ]
        
        authors.forEach((author)=>{
        
        var deafultAuthor = Data.authorData(author);
        deafultAuthor.save();  
        
        })  
    }
    
    
    var firstTimeUser= Data.userData.find() 
    if(!firstTimeUser.length){

        var admin = {
            userName :"admin",
            password: "12345"
        }
    
        var defaultAdmin = Data.userData(admin);
        defaultAdmin.save();
    }



   genesis++;


}






// Landing Page
app.get("/", (req,res)=>{
    if(genesis==0)
    {
        firstTime().then(()=>{
            var nav = entry;
            var title = "Bibliothek";
                Data.bookData.find().then((books)=>{
                res.render("index",{nav,title,books});
            })
        })
    }
    else{
        var nav = entry;
        var title = "Bibliothek";
            Data.bookData.find().then((books)=>{
            res.render("index",{nav,title,books});
        })
    }

})

// Sign In

app.get("/signin",(req,res)=>{
    
        var nav = [{links:"/",name:"Home"},{links:"/signup",name:"New Here?"}]
        var title = "Sign In";
        var userNameComment = "";
        var passwordComment= "";
        res.render("signin.ejs",{nav,title,userNameComment,passwordComment})
    })

    
app.post("/signin",(req,res)=>{

    Data.userData.findOne({userName:req.body.emailorphone},(err,foundUser)=>{
        if(err){
            console.log(error);
        }
        else{
            
            if(foundUser){

                if(Data.userData.findOne({password:req.body.password},(error,passwordMatch)=>{
                    if(error){
                       console.log(error); 
                    }
                    else{
                        if(passwordMatch){
                            if(foundUser.userName=="admin"){
                                res.redirect("/admin")
                            }
                            else{
                                res.redirect("/loggedin")    
                            }
                            
                        }
                        else{
                            var nav = [{links:"/",name:"Home"},{links:"/signup",name:"New Here?"}]
                            var title = "Sign In";
                            var userNameComment = "Username match";
                            var passwordComment= "Password doesn't match";
                            res.render("signin.ejs",{nav,title,userNameComment,passwordComment})
                        }
                    }
                })){}
            
            }
            else{
                var nav = [{links:"/",name:"Home"},{links:"/signup",name:"New Here?"}]
                var title = "Sign In";
                var userNameComment = "Username not found";
                var passwordComment= "";
                res.render("signin",{nav,title,userNameComment,passwordComment})
            }

        }
        })
    


})    

// Sign Up

app.get("/signup",(req,res)=>{

    var nav = [{links:"/",name:"Home"},{links:"/signin",name:"Already A Member?"}]
    var title = "Sign Up";
    res.render("signup",{nav,title})

})

app.post("/signup",(req,res)=>{

    var item={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        userName:req.body.emailorphone,
        DOB:req.body.DOB,
        password:req.body.password
    }

    newUser = Data.userData(item);
    newUser.save();
    res.redirect("/signin")
})


app.listen(4000,()=>{
    console.log("You have arrived @ server 4000")
})
