export class Board {
	constructor(width, height, canvas_width) {
		this.width = width;
		this.height = height;
		this.board = this.get_board();
		this.canvas_square_size = canvas_width / this.width;
	}

	get_board() {
		let arr = [];
		for (let row = 0; row < this.height; row++) {
			let arr_row = [];
			for (let col = 0; col < this.height; col++) {
				const element = 0;
				arr_row.push(element);
			}
			arr.push(arr_row);
		}
		return arr;
	}
}
