import { ingredient } from './ingredient.class';

export class recipe {
	//using map to help with searching for ingredients.
	ingredients: Map<string, ingredient>  = new Map();
	instructions: Map<string, number> = new Map();
	estimatedTime = 0;
	
	constructor(public name: string) {
	}
	// adds ingredient to list and returns the total amount of that ingredient in the recipe.
	// returns -1 if there are any errors adding the ingredient.
	addItem(name: string, amt: number) {
		
		//0 is a valid amount to add. 
		//For example you may not want to specify quanities for salt/pepper.
		if (amt < 0 || isNaN(amt)) {
			return -1;
		}
		
		//use lower case to avoid duplicate ingredients.
		let n : string = name.toLocaleLowerCase();
		let i : ingredient;

		//case ingredient exisits already
		if(this.ingredients.has(n)) {
			i = this.ingredients.get(n);
		} else { //ingredient doesn't exists.
			i = new ingredient(name); //preserves user formatting of first instance of ingredient added.
			this.ingredients.set(n, i); //lower case formatting for keys.
		}
		
		//update amount of ingredient i in the recipe.
		return i.add(amt);
	}
	//returns the total time of the recipe
	//returns -1 for invalid time input or duplicate instruction(time is not changed. need method for this in the future)
	addInstruction(i: string, time: number) {
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
		let list: ingredient[] = [];
		
	
		return Array.from(this.ingredients.values());

	}

	getArrayInstructions() {
		
		let keys = Array.from(this.instructions.keys());
		let values = Array.from(this.instructions.values());
		let a : string[][] = [];
		
		for(let i = 0; i < this.instructions.size; i++) {
			a[i] =[];
			a[i][0] = keys[i];
			a[i][1] = values[i].toString();
		}

		return a;

	}

}
