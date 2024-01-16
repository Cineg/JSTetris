export const puzzleTypes = [1, 2, 3, 4, 5, 6, 7];

export class Puzzle {
	// 7 types
	constructor(type) {
		this.type = type;
		this.color = Math.floor(Math.random() * 6) + 1; //<- 7 puzzle types = 7 colors? Maybe will change to diversify
		this.shape = this.createShape();
		this.position = [];
		this.isActive = true;
	}

	flipRight() {
		let reversed = this.shape.map((row) => row.reverse());
		let flipped = [];
		for (let row = 0; row < this.shape[0].length; row++) {
			let transposedRow = [];
			for (let col = 0; col < this.shape.length; col++) {
				transposedRow.push(this.shape[col][row]);
			}
			flipped.push(transposedRow);
		}
		this.shape = flipped;
		//return flipped;
	}

	flipLeft() {
		let flipped = [];
		for (let row = 0; row < this.shape[0].length; row++) {
			let transposedRow = [];
			for (let col = 0; col < this.shape.length; col++) {
				transposedRow.push(this.shape[col][row]);
			}
			transposedRow.reverse();
			flipped.push(transposedRow);
		}
		this.shape = flipped;
		//return flipped;
	}

	createShape() {
		let arr = [];
		switch (this.type) {
			case 1:
				arr.push([this.color]);
				arr.push([this.color]);
				arr.push([this.color]);
				arr.push([this.color]);
				return arr;

			case 2:
				arr.push([0, this.color]);
				arr.push([0, this.color]);
				arr.push([this.color, this.color]);
				return arr;

			case 3:
				arr.push([this.color, 0]);
				arr.push([this.color, 0]);
				arr.push([this.color, this.color]);
				return arr;

			case 4:
				arr.push([this.color, this.color]);
				arr.push([this.color, this.color]);
				return arr;

			case 5:
				arr.push([0, this.color, this.color]);
				arr.push([this.color, this.color, 0]);
				return arr;

			case 6:
				arr.push([this.color, this.color, this.color]);
				arr.push([0, this.color, 0]);
				return arr;

			case 7:
				arr.push([this.color, this.color, 0]);
				arr.push([0, this.color, this.color]);
				return arr;
		}
	}
}
