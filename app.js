//require the express module to crete our server
const express=require("express");
//require the body-parser module to encode the information in json format
const bodyParser= require("body-parser");

let items=["Buy Food", "Cook Food", "Eat Food"];
//get the express package en a diferent variable 
//to use it without make changes in the original pachage
const app=express();

//set up the folder to save the ejs files
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
//create the route to serve all the static files
app.use(express.static("public"));

//method get that allows us to send the information to the html file.
app.get("/",function(req,res){
	
	let today = new Date();
	let options = {
		weekdays: "long",
		day: "numeric",
		month: "long"
	}

	let day =today.toLocaleDateString("en-US",options);

	//set up the information to be available in the
	//ejs file
	res.render("list",{kindOfDay:day, newListItems:items});
});

//get the information from the html file
//with a post request
app.post("/",function(req,res){
	//Get the value that comes from the form
	let item=req.body.newItems;
	//Add the new item to the array
	items.push(item);
	//redirect to the html file to show the new information
	res.redirect("/");
});


app.listen(3000,function(){

	console.log("server started at port 3000");

});

