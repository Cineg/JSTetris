export class Board {
	constructor(width, height, canvas_width, is_mini) {
		this.width = width;
		this.height = height;
		this.board = this.get_board();
		this.canvas_square_size = canvas_width / this.width;
		this.is_mini = is_mini;
	}

	get_board() {
		let arr = [];
		for (let row = 0; row < this.height; row++) {
			let arr_row = [];
			for (let col = 0; col < this.width; col++) {
				const element = 0;
				arr_row.push(element);
			}
			arr.push(arr_row);
		}
		return arr;
	}

	check_game_over() {
		for (let index = 0; index < this.board[0].length; index++) {
			const element = this.board[0][index];
			if (element != 0) {
				return true;
			}
		}
		return false;
	}

	check_board_score() {
		let rowsToRemove = [];
		for (let row = 0; row < this.board.length; row++) {
			let flag = true;
			for (let col = 0; col < this.board[row].length; col++) {
				const item = this.board[row][col];
				if (item == 0) {
					flag = false;
					break;
				}
			}
			if (flag) {
				rowsToRemove.push(row);
			}
		}

		let last_row = Math.max(...rowsToRemove);
		while (last_row > 0) {
			this.board[last_row] = this.board[last_row - 1];
			last_row -= 1;
		}

		return rowsToRemove.length;
	}
}
