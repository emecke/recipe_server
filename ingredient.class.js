"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

class ingredient {

	
	
	constructor(item_name) {
		this.name = item_name;
		this.quantity = 0;
	}
	
	//returns -1 for invalid input
	//returns total quanity for valid input
	add(amount) {
		if(amount < 0 || isNaN(amount)) {
			return -1;
		} else {
			this.quantity += amount;
			return this.quantity;
		}
		
	}

	//returns remaining quanity of item, 
	//returns -1 if operation fails due to insuffient quanity (quantity is not changed)
	//return -1 for invalid input (quanity is not changed)
	subtract(amount) {
		if(amount < 0 || isNaN(amount) || this.quantity - amount < 0) {
			return -1;
		} else {
			this.quantity -= amount;
			return this.quantity;
		}
	}

	toJSON() {
		let j = "ingredient { name: ";
		j.concat(this.name);
		j.concat(", quantity: ");
		j.concat(this.quantity);
		j.concat(" }");
		return j;
	}
}

exports.ingredient = ingredient;
