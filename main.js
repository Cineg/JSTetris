import { Board } from "./board.js";
import { Puzzle, puzzleTypes } from "./puzzle.js";

const changeTypeButton = document.getElementById("test_change_type");
const flipLeftButton = document.getElementById("test_flip_left");
const flipRightButton = document.getElementById("test_flip_right");

window.addEventListener("keydown", function (e) {
	switch (e.key) {
		case "ArrowDown":
			if (timeInterval === 200) return;

			stopGameLoop();
			timeInterval = 200;
			startGameLoop();
			return;
		case "ArrowRight":
			movePuzzle(-1);
			return;
		case "ArrowLeft":
			movePuzzle(1);
			return;
	}
});

window.addEventListener("keyup", function (e) {
	switch (e.key) {
		case "ArrowDown":
			if (timeInterval === 500) return;
			stopGameLoop();
			timeInterval = 500;
			startGameLoop();
			return;
	}
});

document
	.getElementById("startGameLoop")
	.addEventListener("click", startGameLoop);
document.getElementById("stopGameLoop").addEventListener("click", stopGameLoop);

let intervalId;
let timeInterval = 500;
let puz_queue = [new Puzzle(Math.floor(Math.random() * 6) + 1)];

changeTypeButton.addEventListener("click", function (e) {
	_currentItem++;
	if (_currentItem > 7) _currentItem = 1;

	puz = new Puzzle(_currentItem);

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 500, 800);
	drawCanvas(puz);
});

flipLeftButton.addEventListener("click", function (e) {
	puz.flipLeft();

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 500, 800);
	drawCanvas(puz);
});

flipRightButton.addEventListener("click", function (e) {
	puz.flipRight();

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 500, 800);
	drawCanvas(puz);
});

let _currentItem = 1;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let board = new Board(15, 30, canvas.offsetWidth);
console.log(board);

let puz = new Puzzle(Math.floor(Math.random() * 6) + 1);

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 500, 800);

drawCanvas(puz);

function getColor(num) {
	switch (num) {
		case 0:
			return "rgba(0, 0, 0, 0)";
		case 1:
			return "white";
		case 2:
			return "yellow";
		case 3:
			return "red";
		case 4:
			return "blue";
		case 5:
			return "green";
		case 6:
			return "pink";
		case 7:
			return "grey";

		default:
			return "white";
	}
}

function drawCanvas(puzzle) {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 500, 800);

	for (let row = 0; row < board.height; row++) {
		for (let col = 0; col < board.width; col++) {
			ctx.fillStyle = getColor(board.board[row][col]);
			ctx.fillRect(
				col * board.canvas_square_size,
				row * board.canvas_square_size,
				board.canvas_square_size,
				board.canvas_square_size
			);
		}
	}

	for (let row = 0; row < puzzle.shape.length; row++) {
		for (let col = 0; col < puzzle.shape[0].length; col++) {
			ctx.fillStyle = getColor(puzzle.shape[row][col]);
			ctx.fillRect(
				(col + puzzle.position[1]) * board.canvas_square_size,
				(row + puzzle.position[0]) * board.canvas_square_size,
				board.canvas_square_size,
				board.canvas_square_size
			);
		}
	}
}

function startGameLoop() {
	intervalId = setInterval(function () {
		puz.position[0] += 1;
		if (!is_puzzle_to_stay()) {
			update_board();
			puz = puz_queue.pop();
			puz_queue.push(new Puzzle(Math.floor(Math.random() * 6) + 1));
		}

		drawCanvas(puz);
	}, timeInterval);
}

function stopGameLoop() {
	clearInterval(intervalId);
}

function movePuzzle(dir) {
	puz.position[1] -= dir;
	if (puz.position[1] < 0) puz.position[1] = 0;
	if (puz.position[1] > board.width - puz.shape[0].length)
		puz.position[1] = board.width - puz.shape[0].length;

	drawCanvas(puz);
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

function update_board() {
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
