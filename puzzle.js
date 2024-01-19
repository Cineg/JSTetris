export const puzzleTypes = [1, 2, 3, 4, 5, 6, 7];

export class Puzzle {
	// 7 types
	constructor(type, position = [0, 0]) {
		this.type = type;
		this.color = Math.floor(Math.random() * 6) + 1; //<- 7 puzzle types = 7 colors? Maybe will change to diversify
		this.shape = this.createShape();
		this.position = position;
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
				arr.push([this.type]);
				arr.push([this.type]);
				arr.push([this.type]);
				arr.push([this.type]);
				return arr;

			case 2:
				arr.push([0, this.type]);
				arr.push([0, this.type]);
				arr.push([this.type, this.type]);
				return arr;

			case 3:
				arr.push([this.type, 0]);
				arr.push([this.type, 0]);
				arr.push([this.type, this.type]);
				return arr;

			case 4:
				arr.push([this.type, this.type]);
				arr.push([this.type, this.type]);
				return arr;

			case 5:
				arr.push([0, this.type, this.type]);
				arr.push([this.type, this.type, 0]);
				return arr;

			case 6:
				arr.push([this.type, this.type, this.type]);
				arr.push([0, this.type, 0]);
				return arr;

			case 7:
				arr.push([this.type, this.type, 0]);
				arr.push([0, this.type, this.type]);
				return arr;
		}
	}

	get_coordinates() {
		let position = [];

		for (let row = 0; row < this.shape.length; row++) {
			let row_pos = [];
			for (let col = 0; col < this.shape[0].length; col++) {
				const item = [row + this.position[0], col + this.position[1]];

				if (this.shape[row][col] == 0) {
					row_pos.push(0);
				} else {
					row_pos.push(item);
				}
			}
			position.push(row_pos);
		}
		return position;
	}
}
