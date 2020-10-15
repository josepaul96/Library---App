const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library',{useUnifiedTopology:true,useNewUrlParser:true})
const schema = mongoose.Schema;

const userSchema = new schema({

    userName:String,
    password:String,
    firstName:String,
    lastName:String,
    DOB:String
})

const bookSchema = new schema({
    
    title: String,
    author: String,
    genre:String,
    image: String
});

const authorSchema = new schema({
    
    name:String,
    DOB:String,
    genre:String,
    books:Object,
    image:String
})




var bookData = mongoose.model("bookdata",bookSchema);
var authorData = mongoose.model("authordata",authorSchema);
var userData = mongoose.model("userdata",userSchema);

module.exports = {
    bookData,
    authorData,
    userData
}
