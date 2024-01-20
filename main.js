import { Board } from "./board.js";
import { Puzzle } from "./puzzle.js";

window.addEventListener("keydown", function (e) {
	switch (e.key) {
		case "ArrowDown":
			if (timeInterval === 75) return;

			stopGameLoop();
			timeInterval = 75;
			startGameLoop();
			return;
		case "ArrowRight":
			movePuzzle(-1);
			return;
		case "ArrowLeft":
			movePuzzle(1);
			return;
		case "ArrowUp":
			if (can_flip("left")) {
				puz.flipLeft();
			}
			return;
	}
});

window.addEventListener("keyup", function (e) {
	switch (e.key) {
		case "ArrowDown":
			if (timeInterval === 400) return;
			stopGameLoop();
			timeInterval = 400;
			startGameLoop();
			return;
	}
});

function startGameLoop() {
	intervalId = setInterval(function () {
		puz.position[0] += 1;
		if (!is_puzzle_to_stay()) {
			update_board(board);
			puz = puz_queue.pop();
			puz_queue.push(getNewPuzzle());
		}

		drawCanvas(ctx, board, puz);
		drawCanvas(mini_ctx, mini_board, puz_queue[0]);
	}, timeInterval);
}

function stopGameLoop() {
	clearInterval(intervalId);
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const mini_canvas = document.getElementById("next-puzzle");
const mini_ctx = mini_canvas.getContext("2d");

let intervalId;
let timeInterval = 400;
let board = new Board(15, 30, canvas.offsetWidth, false);
let mini_board = new Board(4, 4, mini_canvas.offsetWidth, true);

let puz = getNewPuzzle();
let puz_queue = [getNewPuzzle()];

drawCanvas(ctx, board, puz);
drawCanvas(mini_ctx, mini_board, puz_queue[0]);

function getColor(num) {
	switch (num) {
		case 0:
			return "rgba(0, 0, 0, 0)";
		case 1:
			return "#ff3215";
		case 2:
			return "#63145b";
		case 3:
			return "#f23553";
		case 4:
			return "#569fb1";
		case 5:
			return "#00a08c";
		case 6:
			return "#eed988";
		case 7:
			return "#b8b6b9";

		default:
			return "white";
	}
}

function drawCanvas(canvas_context, board, puzzle) {
	draw_blank_board(canvas_context, board);

	for (let row = 0; row < board.height; row++) {
		for (let col = 0; col < board.width; col++) {
			canvas_context.fillStyle = getColor(board.board[row][col]);
			canvas_context.fillRect(
				col * board.canvas_square_size,
				row * board.canvas_square_size,
				board.canvas_square_size,
				board.canvas_square_size
			);
		}
	}

	let position;
	if (board.is_mini) {
		position = puz.mini_position;
	} else {
		position = puz.position;
	}
	for (let row = 0; row < puzzle.shape.length; row++) {
		for (let col = 0; col < puzzle.shape[0].length; col++) {
			canvas_context.fillStyle = getColor(puzzle.shape[row][col]);
			canvas_context.fillRect(
				(col + position[1]) * board.canvas_square_size,
				(row + position[0]) * board.canvas_square_size,
				board.canvas_square_size,
				board.canvas_square_size
			);
		}
	}
}

function movePuzzle(dir) {
	let new_position = puz.position[1] - dir;
	if (new_position < 0) new_position = 0;
	if (new_position > board.width - puz.shape[0].length)
		new_position = board.width - puz.shape[0].length;

	// check for other puzzles
	if (can_move(new_position)) {
		puz.position[1] = new_position;
	}

	drawCanvas(ctx, board, puz);
}

function is_puzzle_to_stay() {
	let puzzle_position = puz.get_coordinates();
	console.log(puzzle_position);
	for (let row = 0; row < puzzle_position.length; row++) {
		for (let col = 0; col < puzzle_position[row].length; col++) {
			const element = puzzle_position[row][col];
			if (element == 0) {
				continue;
			}

			if (element[0] == board.height - 1) {
				return false;
			}

			if (board.board[element[0] + 1][element[1]] != 0) {
				return false;
			}
		}
	}
	return true;
}

function can_move(new_col) {
	for (let row = 0; row < puz.shape.length; row++) {
		for (let col = 0; col < puz.shape[0].length; col++) {
			const element = puz.shape[row][col];
			if (element == 0) {
				continue;
			}
			const board_value =
				board.board[row + puz.position[0]][col + new_col];
			if (board_value != 0) {
				return false;
			}
		}
	}
	return true;
}

function can_flip(direction) {
	let shape = puz.shape;

	if (direction == "left") {
		puz.flipLeft();
	}

	if (direction == "right") {
		puz.flipRight();
	}

	for (let row = 0; row < puz.shape.length; row++) {
		for (let col = 0; col < puz.shape[row].length; col++) {
			const element = puz.shape[row][col];
			if (
				element != 0 &&
				board.board[puz.position[0] + row][puz.position[1] + col] != 0
			) {
				puz.shape = shape;
				return false;
			}
		}
	}
	puz.shape = shape;
	return true;
}

function update_board(board) {
	let puzzle_position = puz.get_coordinates();
	for (let row = 0; row < puzzle_position.length; row++) {
		for (let col = 0; col < puzzle_position[row].length; col++) {
			const element = puzzle_position[row][col];
			if (element == 0) {
				continue;
			}
			board.board[element[0]][[element[1]]] = puz.shape[row][col];
		}
	}
}

function draw_blank_board(canvas_context, board) {
	canvas_context.fillStyle = "black";
	canvas_context.fillRect(
		0,
		0,
		board.width * board.canvas_square_size,
		board.height * board.canvas_square_size
	);
}

function getNewPuzzle() {
	let new_puzzle = new Puzzle(Math.floor(Math.random() * 6) + 1);
	let width = board.get_center(new_puzzle.shape.length);
	let mini_width = mini_board.get_center(new_puzzle.shape.length);
	new_puzzle.position = [0, width];
	new_puzzle.mini_position = [0, mini_width];
	return new_puzzle;
}
