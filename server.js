
//from bbt example code
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//from bbt example code
const express = require("express");
const recipe_1 = require("./recipe.class");
const ingredient_1 = require("./ingredient.class");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express(); //Call express factory to create an 'app'
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(bodyParser.json()); //Parse json http bodies


var recipe_list = [];
let r1 = new recipe_1.recipe("peas and carrots");
r1.addItem("peas", 10);
r1.addItem("carrots", 3);
r1.addInstruction("shell peas", 10);
r1.addInstruction("chop carrots", 5);



let r2 = new recipe_1.recipe("beef and broccoli");
r2.addItem("beef", 1);
r2.addItem("broccoli", 2);
r2.addInstruction("saute meat", 8);
r2.addInstruction("steam broccoli", 5);

let r3 = new recipe_1.recipe("chicken soup");
r3.addItem("chicken", 1);
r3.addItem("noodles", 5);
r3.addInstruction("boil chicken", 20);
r3.addInstruction("add noddles to soup", 5);

recipe_list.push(r1);
//console.log(r1);
recipe_list.push(r2);
//console.log(r2);
recipe_list.push(r3);
//console.log(r3);



//test from bbt example
app.get("/test", function (req, res) {
    //simple test as per example
    res.send('{"test": 1 }');
});



//recipelist can be a get request which takes in 0 parameters. 
//The server will send back a list of all the recipes stored. 
//Optionally, it will return an id for each recipe allow.
app.get("/recipelist", function (req, res) {
    console.log("sending recipe list");
    res.header("Content-Type", "application/json");
    console.log(recipe_list);
    //res.json(recipe_list);
    res.send(recipe_list);
    //console.log()
    
    

});

//retrieve recipe takes in one parameter which represents the recipe to be retrieved. 
//The recipe can be retrieved by the name or id. 
//The server will send back the recipe.
app.get("/retrieverecipe/:recipe_name", function(req, res) {
    console.log("Requesting Recipe: ", req.params.recipe_name);
    let index = recipe_list.findIndex(item => {
        console.log("  checking: ", item.name);
        return item.name.toLowerCase() === req.params.recipe_name.toLowerCase();
    });

    if (index > -1) { 
        console.log("Recipe Found");
        res.header("Content-Type", "application/json"); //from example code
        res.json(recipe_list[index]);
    } else {
        console.log("Recipe Not Found");
        res.status(404).send('Recipe Not Found');
    }
});

//constructs a new recipe based on json string that represents a recipe.
function recipeDeepCopy(jsonBody) {
	let r = new recipe_1.recipe(jsonBody.name);
	//ingredients list
	for(var i in jsonBody.ingredients) {
		r.addItem(i.value.name, i.value.quantity);
	}
	//instructions list
	for(var j in jsonBody.ingredients) {
		r.addInstruction(j.key, j.value);
	}
	return r;
}


//This one must be a post request. 
//addrecipe will take in a recipe through the message body, so we need a post request from the client. 
//The server will send back true or false depending on whether the recipe has been added successfully. 
//If it has not been added, a reason should be given for the failure. 
//For this lab, you can have the add fail 50% of the time.
app.post("/addrecipe", function(req, res) {
    console.log("body", req.body);

    //check for recipe to verify that one with the same name does not exisit.
    let index = recipe_list.findIndex(item => item.name.toLowerCase() === req.body.name.toLowerCase())
    
    if(index == - 1) { //recipe does not exist
        //create new recipe
        let r = recipeDeepCopy(req.body);
        recipe_list.push(r);
        console.log("new recipe added to server");
        res.send(true);
    }

    else if(index > -1) { //recipe already exists
        console.log(req.body.name, "error: recipe exists");
        //good input but server does not accept two recipes with the same name.
        res.status(403).send('{"error": recipe with this name already exists. Existing recipe should be Deleted first.}');
        
    }

    else { //unknown error
        console.log(req.body.name, "error adding recipe");
        res.status(520).send('{"error": add recipe failed }');
    }
    
    

});


//deleterecipe will take in one parameter, the name or id of the recipe. 
//The sever will delete the recipe from it's storage. 
//The server will send back true or false depending on whether the recipe has been successfully deleted.
app.get("/deleterecipe/:recipe_name", function(req, res) {
    console.log("delete request", req.params.recipe_name);
    let index = recipe_list.findIndex(item => item.name.toLowerCase() === req.params.recipe_name.toLowerCase())
    
    if(index == - 1) { //recipe does not exist
        console.log(req.params.recipe_name, "cannot delete recipe that does not exisit");
        res.send('{"error": recipe not deleted becuase recipe does not exisit}');
    }

    else if(index > -1) { //recipe exists
        console.log(req.params.recipe_name, " to be deleted");
        recipe_list = recipe_list.filter(item => {
            let keep = item.name.toLowerCase() != req.params.recipe_name.toLowerCase();
            if(!keep) {
                console.log(req.params.recipe_name, " deleted");
            }
            return keep;
        });
        res.send(true);
        
    }

    else { //unknown error
        console.log(req.body.name, "error deleting recipe");
        res.send('{"error": delete recipe failed}');
    }
    
    

});


//Start the server
app.listen(8000, function () {
    console.log("server started");
});