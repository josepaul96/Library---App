# Library---App

#General Information

A simple libray web app, which shows a list of books and it's authors. Registration is required to log in, with client-side verification. One can log in using the registered details and then get to see the details about the book or it's author.
An admin account can add new books or new authors or edit current details. This is my first project with a back-end integration. This helped in familiarising myself with ExpressJS, NodeJS and MongoDB and EJS template engine.

#Technologies & Frameworks Used

*ExpressJS
*Node JS
*EJS
*HTML 5
*CSS 3.0
*Javascript ES6

#Functionalities

Normal Access

Sign Up
Anyone can sign up using basic details. Client-side verification will be done and user will be redirected to log-in.

Sign in
Using valid credentials, one can sign in and will be redirected to landing page.

Books
Clicking this will take you to a page that shows details of all the present book details. Clicking an individual book will show it's details.

Authors
Clicking this will take you to a page that shows details of all the present author details. Clicking an indidual author will show some extra details.


Admin Access

For Admin Access, sign in using 
username: admin
password: 12345

Admin account has functionalities same as above, plus

Add Book
Allows the addition of a new book. After adding the book,the book will be visible to all other users, under books section.

Add Author
Allows the addition of a new book. After adding the book,the book will be visible to all other users, under books section.


#Known Bugs

An Unresolved Promise error comes, on clicking any individual book or author. All the relevant page content loads, but the page doesn't finish loading.

#Setting Up

Open the folder in command line.
Type in "node index"

Open another terminal window and run mongo and mongod (assuming you already have mongo installed)

