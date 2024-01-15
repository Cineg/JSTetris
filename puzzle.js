export const puzzleTypes = [1, 2, 3, 4, 5, 6, 7];

export class Puzzle {
	// 7 types
	constructor(type) {
		this.type = type;
		this.shape = this.create_shape();
		this.position = [];
		this.isActive = true;
	}

	flip_right() {
		let reversed = this.shape.map((row) => row.reverse());
		let flipped = [];
		for (let row = 0; row < this.shape[0].length; row++) {
			let transposed_row = [];
			for (let col = 0; col < this.shape.length; col++) {
				transposed_row.push(this.shape[col][row]);
			}
			flipped.push(transposed_row);
		}
		this.shape = flipped;
		//return flipped;
	}

	flip_left() {
		let flipped = [];
		for (let row = 0; row < this.shape[0].length; row++) {
			let transposed_row = [];
			for (let col = 0; col < this.shape.length; col++) {
				transposed_row.push(this.shape[col][row]);
			}
			transposed_row.reverse();
			flipped.push(transposed_row);
		}
		this.shape = flipped;
		//return flipped;
	}

	create_shape() {
		let arr = [];
		switch (this.type) {
			case 1:
				arr.push([1]);
				arr.push([1]);
				arr.push([1]);
				arr.push([1]);
				return arr;

			case 2:
				arr.push([0, 2]);
				arr.push([0, 2]);
				arr.push([2, 2]);
				return arr;

			case 3:
				arr.push([3, 0]);
				arr.push([3, 0]);
				arr.push([3, 3]);
				return arr;

			case 4:
				arr.push([4, 4]);
				arr.push([4, 4]);
				return arr;

			case 5:
				arr.push([0, 5, 5]);
				arr.push([5, 5, 0]);
				return arr;

			case 6:
				arr.push([6, 6, 6]);
				arr.push([0, 6, 0]);
				return arr;

			case 7:
				arr.push([7, 7, 0]);
				arr.push([0, 7, 7]);
				return arr;
		}
	}
}
