let username = document.getElementById("emailorphone");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword")
let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let DOB = document.getElementById("DOB")


let firstNameComment = document.getElementById("firstNameComment");
let lastNameComment = document.getElementById("lastNameComment");
let userNameComment = document.getElementById("userNameComment");
let passwordComment = document.getElementById("passwordComment");
let confirmPassComment = document.getElementById("confirmPassComment");
let dobComment = document.getElementById("dobComment");

var RegNumbers1 = /^(\d{3}) (\d{3}) (\d{4})$/;
var RegNumbers2 = /^(\d{3})+(\d{3})+(\d{4})$/;
var RegNumbers3 = /^(\d{3}).(\d{3}).(\d{4})$/;
var RegNumbers0 = /^(\d{10})&/

var RegEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w{2,3})*(\.\w{2,3})+$/

var RegName = /^[a-zA-Z]+$/

var RegDOB1 = /^(\d{2})[\/-](\d{2})[\/-](\d{4})$/

// Check if Email or Phone number is legitimate //





function firstNameCheck(){
    if (firstName.value.match(RegName)){
        firstNameComment.innerHTML="Name is valid"
        successstyle(firstNameComment,firstName)
        return true;
    }
    else if(firstName.value==""){
        firstNameComment.innerHTML="Field Cannot Be Empty"
        errorstyle(firstNameComment,firstName);
        return false;
    }
    else{
        firstNameComment.innerHTML="Invalid Name"
        errorstyle(firstNameComment,firstName)
        return false;
    }
}

function lastNameCheck(){
    if (lastName.value.match(RegName)){
        lastNameComment.innerHTML="Name is valid"
        successstyle(lastNameComment,lastName)
        return true;
    }
    else if(lastName.value==""){
      lastNameComment.innerHTML="Field Cannot Be Empty"
      errorstyle(lastNameComment,firstName)
      return false;
  }
    else{
        lastNameComment.innerHTML="Invalid Name"
        errorstyle(lastNameComment,lastName)
        return false;
    }
}

function dobCheck(){

    var array =DOB.value.split("-");
    if((array[0]>31) && (array[1]==0|| array[1]>12)){
      dobComment.innerHTML="Date & Month is Invalid"
      errorstyle(dobComment,DOB)
      return false;
    }
    else if(array[0]>31){
        dobComment.innerHTML="Date is Invalid"
        errorstyle(dobComment,DOB)
      
    }
    else if(array[1]==0|| array[1]>12){
      dobComment.innerHTML="Month is Invalid"
      errorstyle(dobComment,DOB)
    }
    else if(DOB.value.match(RegDOB1)){
        dobComment.innerHTML="DOB is valid"
        successstyle(dobComment,DOB);
        return true;
    }
    else{
        dobComment.innerHTML="DOB is Invalid"
        errorstyle(dobComment,DOB)
        return false;
    }
}

function usernameCheck() {
   if(username.value=="admin"){
    return true;
   }
   else if (username.value == "") {
    userNameComment.innerHTML = "Field is empty!";
    errorstyle(userNameComment,username)
    return false;
  } else if (username.value.match(RegEmail)) {
    userNameComment.innerHTML = "Email is valid";
    successstyle(userNameComment,username);
    return true;
  } else if ((username.value.match(RegNumbers1)) || (username.value.match(RegNumbers2)) || (username.value.match(RegNumbers3))) {
    userNameComment.innerHTML = "Phone number is valid";
    successstyle(userNameComment,username)
    return true;
  } else if (username.value.includes("@")) {
    userNameComment.innerHTML = "Invalid email id!";
    errorstyle(userNameComment,username)
    return false;
  } else if (username.value.match(/([\d]+)/)) {
    userNameComment.innerHTML = "Invalid phone number!";
    errorstyle(userNameComment,username)
    return false;

  } else {
    userNameComment.innerHTML = "Invalid entry!";
    errorstyle(userNameComment,username)
    return false;
  }

}



// Check if password is legitimate // 



function signUpPassCheck() {

  var haslowercase = (password.value.match(/[a-z]/));
  var hasuppercase = (password.value.match(/[A-Z]/));
  var hasnumber = (password.value.match(/\d/));

  

    if (password.value == "") {
        passwordComment.innerHTML = "Password cannot be blank!";
        errorstyle(passwordComment,password);
        return false;
      } else if (password.value.length < 8) {
        passwordComment.innerHTML = "Password must contain at least eight characters!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase == null && hasuppercase != null && hasnumber != null) {
        passwordComment.innerHTML = "Password must contain atleast one lowercase letter!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase != null && hasuppercase == null && hasnumber != null) {
        passwordComment.innerHTML = "Password must contain atleast one uppercase letter!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase != null && hasuppercase != null && hasnumber == null) {
        passwordComment.innerHTML = "Password must contain atleast one  number!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase == null && hasuppercase == null && hasnumber != null) {
        passwordComment.innerHTML = "Password must contain atleast one lowercase and one uppercase!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase == null && hasuppercase != null && hasnumber == null) {
        passwordComment.innerHTML = "Password must contain atleast one lowercase and one number!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase != null && hasuppercase == null && hasnumber == null) {
        passwordComment.innerHTML = "Password must contain atelast one uppercase and one number!";
        errorstyle(passwordComment,password);
        return false;
      } else if (username.value == password.value) {
        passwordComment.innerHTML = "Username and password cannot be the same!";
        errorstyle(passwordComment,password);
        return false;
      } 
      else if ( password.value !== confirmPassword.value ){
        confirmPassComment.innerHTML="Passwords doesn't match";
        passwordComment.innerHTML="Passwords doesn't match";
        errorstyle(confirmPassComment,confirmPassword)
        errorstyle(passwordComment,password)
        return false;
      }
      else {
        passwordComment.innerHTML = "Password is verified";
        successstyle(passwordComment,password);
        confirmPassComment.innerHTML="Passwords match"
        successstyle(confirmPassComment,confirmPassword)
        return true;
      }
  
}


function signInPassCheck() {    
    ispassword = 1;



    var haslowercase = (password.value.match(/[a-z]/));
    var hasuppercase = (password.value.match(/[A-Z]/));
    var hasnumber = (password.value.match(/\d/));
    if (username.value=="admin"){
      return true;
    }
    else{
      if (password.value == "") {
        passwordComment.innerHTML = "Password cannot be blank!";
        errorstyle(passwordComment,password);
        return false;
      } else if (password.value.length < 8) {
        passwordComment.innerHTML = "Password must contain at least eight characters!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase == null && hasuppercase != null && hasnumber != null) {
        passwordComment.innerHTML = "Password must contain atleast one lowercase letter!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase != null && hasuppercase == null && hasnumber != null) {
        passwordComment.innerHTML = "Password must contain atleast one uppercase letter!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase != null && hasuppercase != null && hasnumber == null) {
        passwordComment.innerHTML = "Password must contain atleast one  number!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase == null && hasuppercase == null && hasnumber != null) {
        passwordComment.innerHTML = "Password must contain atleast one lowercase and one uppercase!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase == null && hasuppercase != null && hasnumber == null) {
        passwordComment.innerHTML = "Password must contain atleast one lowercase and one number!";
        errorstyle(passwordComment,password);
        return false;
      } else if (haslowercase != null && hasuppercase == null && hasnumber == null) {
        passwordComment.innerHTML = "Password must contain atelast one uppercase and one number!";
        errorstyle(passwordComment,password);
        return false;
      } else if (username.value == password.value) {
        passwordComment.innerHTML = "Username and password cannot be the same!";
        errorstyle(passwordComment,password);
        return false;
      } else {
        passwordComment.innerHTML = "Password is verified";
        successstyle(passwordComment,password);
        return true;
      }
    }
    
    
}


//Check if both email/phonenumber and password is legitimate

let signUpForm = document.getElementById("signUpForm")

function checkSignUp() {
  

  let e = dobCheck()
  
  let b = signUpPassCheck()
  
  let c = firstNameCheck()
  let d = lastNameCheck()
  
  let a = usernameCheck()
 
  if (a && b && c && d && e) {
    signUpForm.setAttribute("method","POST");
  } else {
    return false;
  }
  

}


function checkSignIn() {

  var signInForm = document.getElementById("signInForm");

    let a = usernameCheck()
    let b = signInPassCheck()

    if (a && b) {
      signInForm.setAttribute("method","POST")
    } else {
      return false;
    }
  }



// Add strength meter for password// 



function passwordmeter(password) {

  if ((password.value.length > 0) && (password.value.length < 8))

  {
    password.style.color = "#fd5e53";

  } else if ((password.value.length >= 8) && (password.value.length < 12)) {


    password.style.color = "#f7b71d";

  } else if (password.value.length > 12) {


    password.style.color = "#21bf73";

  }


}



// Add Book

 var regBookName = /^[a-zA-Z0-9-.+=?@ ]+$/
 var regAlphabets = /^[a-zA-Z ]+$/
 var bookName= document.getElementById("bookName");
  var bookGenre = document.getElementById("bookGenre");
  var bookAuthor = document.getElementById("bookAuthor")
  var newBook = document.getElementById("newBook");
  var bookNameComment = document.getElementById("bookNameComment");
  var genreComment = document.getElementById("bookGenreComment");
  var bookAuthorComment = document.getElementById("bookAuthorComment")

 function checkNewBook(){

  let a = bookName.value.match(regBookName);
  if(a){
    bookNameComment.innerHTML = "Name is verified";
    successstyle(bookNameComment,bookName);
  }
  else{
    bookNameComment.innerHTML = "Name is invalid";
    errorstyle(bookNameComment,bookName);
  }

  let b =bookGenre.value.match(regAlphabets);
  if(b){
    bookGenreComment.innerHTML = "Genre is verified";
    successstyle(bookGenreComment,bookGenre);
  }
  else{
    bookGenreComment.innerHTML = "Genre is invalid";
    errorstyle(bookGenreComment,bookGenre);
  
  }

  let c =bookAuthor.value.match(regAlphabets);
  if(c){
    bookAuthorComment.innerHTML = "Author is verified";
    successstyle(bookAuthorComment,bookAuthor);
  } 
  else{
    bookAuthorComment.innerHTML = "Author is invalid";
    errorstyle(bookAuthorComment,bookAuthor);
  } 

  if (a&&b&&c){
    
    newBook.setAttribute("method","POST")
  }
  else{
    return false;
  }

 }




// Add Author 

var regBookName = /^[a-zA-Z0-9-.+=?@ ]+$/
var regAlphabets = /^[a-zA-Z ]+$/

var Author= document.getElementById("Author")
var authorName= document.getElementById("authorName");
var authorGenre = document.getElementById("authorGenre");
var authorDOB = document.getElementById("authorDOB");
var authorBook1 = document.getElementById("authorBook1");
var authorBook2 = document.getElementById("authorBook2")
var authorImage = document.getElementById("authorImage");

var authorNameComment = document.getElementById("authorNameComment");
var authorGenreComment = document.getElementById("authorGenreComment");
var authorDOBComment = document.getElementById("authorDOBComment")
var authorBook1Comment = document.getElementById("authorBook1Comment");
var authorBook2Comment = document.getElementById("authorBook2Comment");  
var authorImageComment = document.getElementById("authorImageComment");

function checkNewAuthor(){

let a = authorName.value.match(regAlphabets);
if(a){
  authorNameComment.innerHTML = "Name is verified";
  successstyle(authorNameComment,authorName);
}
else{
  authorNameComment.innerHTML = "Name is invalid";
  errorstyle(authorNameComment,authorName);
}

let b =authorGenre.value.match(regAlphabets);
if(b){
  authorGenreComment.innerHTML = "Genre is verified";
  successstyle(authorGenreComment,authorGenre);
}
else{
  authorGenreComment.innerHTML = "Genre is invalid";
  errorstyle(authorGenreComment,authorGenre);

}

let c =authorBook1.value.match(regBookName);
if(c){
  authorBook1Comment.innerHTML = "Book is verified";
  successstyle(authorBook1Comment,authorBook1);
} 
else{
  authorBook1Comment.innerHTML = "Book is invalid";
  errorstyle(authorBook1Comment,authorBook1);
} 

let d =authorBook2.value.match(regBookName);
if(d){
  authorBook2Comment.innerHTML = "Book is verified";
  successstyle(authorBook2Comment,authorBook2);
} 
else{
  authorBook2Comment.innerHTML = "Book is invalid";
  errorstyle(authorBook2Comment,authorBook2);
} 

if (a&&b&&c){
  
  Author.setAttribute("method","POST")
}
else{
  return false;
}

}





//Styling for commentbox



function errorstyle(error,borderof){
  error.style.color = "#ca2516";
  borderof.style.border = "4px #ca2516 solid "
}

function successstyle(success,borderof){
  success.style.color = "#639a67";
  borderof.style.border = "4px #639a67 solid ";
}

