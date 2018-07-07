export class ingredient {

	quantity = 0;
	
	constructor(public name: string) {}
	
	//returns -1 for invalid input
	//returns total quanity for valid input
	add(amount: number) {
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
	subtract(amount: number) {
		if(amount < 0 || isNaN(amount) || this.quantity - amount < 0) {
			return -1;
		} else {
			this.quantity -= amount;
			return this.quantity;
		}
	}
}
