"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ingredient_1 = require('./ingredient.class');


class recipe {
	//using map to help with searching for ingredients.
	
	
	constructor(name) {
		this.name = name;
		this.ingredients  = new Map();
		this.instructions = new Map();
		this.estimatedTime = 0;
	}

	// adds ingredient to list and returns the total amount of that ingredient in the recipe.
	// returns -1 if there are any errors adding the ingredient.
	addItem(name, amt) {
		
		//0 is a valid amount to add. 
		//For example you may not want to specify quanities for salt/pepper.
		if (amt < 0 || isNaN(amt)) {
			return -1;
		}
		
		//use lower case to avoid duplicate ingredients.
		let n = name.toLocaleLowerCase();
		let i;

		//case ingredient exisits already
		if(this.ingredients.has(n)) {
			i = this.ingredients.get(n);
		} else { //ingredient doesn't exists.
			i = new ingredient_1.ingredient(name); //preserves user formatting of first instance of ingredient added.
			this.ingredients.set(n, i); //lower case formatting for keys.
		}
		
		//update amount of ingredient i in the recipe.
		return i.add(amt);
	}
	//returns the total time of the recipe
	//returns -1 for invalid time input or duplicate instruction(time is not changed. need method for this in the future)
	addInstruction(i, time) {
		//0 is a valid amount of time to add. 
		//For example "season with salt and pepper", 0
		if (time < 0 || isNaN(time) || this.instructions.has(i)) {
			return -1;
		}
		this.instructions.set(i, time);
		this.estimatedTime += time;
		return this.estimatedTime;
	}


	getArrayIngredients() {
		let list = [];
		
	
		return Array.from(this.ingredients.values());

	}

	getArrayInstructions() {
		
		let keys = Array.from(this.instructions.keys());
		let values = Array.from(this.instructions.values());
		let a = [];
		
		for(let i = 0; i < this.instructions.size; i++) {
			a[i] =[];
			a[i][0] = keys[i];
			a[i][1] = values[i].toString();
		}

		return a;

	}

	toJSON() {
		let j = "recipe { name: ";
		j.concat(this.name);
		j.concat(", ingredients: Map {");
		for(var k in this.ingredients) {
			j.concat(k.key);
			j.concat(" => ");
			j.concat(k.value.toJSON());
			j.concat(", ");
		}
		j = j.slice(0, -1); //remove last ,
		j.concat(" }, ") //end ingredients map.

		j.concat("instructions: Map { " )
		for(var l in this.instructions) {
			j.concat(l.key);
			j.concat(" => ");
			j.concat(l.value);
			j.concat(", ");
		}
		j = j.slice(0, -1); //remove last ,
		j.concat(" }, ") //end instructions map.
		j.concat("estimatedTime: ");
		j.concat(this.estimatedTime);
		j.concat("}");
	}

exports.recipe = recipe;
