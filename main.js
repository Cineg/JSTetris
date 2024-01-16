import { Board } from "./board.js";
import { Puzzle, puzzleTypes } from "./puzzle.js";

const changeTypeButton = document.getElementById("test_change_type");
const flipLeftButton = document.getElementById("test_flip_left");
const flipRightButton = document.getElementById("test_flip_right");

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

let board = new Board(10, 30, canvas.offsetWidth);
console.log(board);

let puz = new Puzzle(4);
puz.flipLeft();

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 500, 800);

drawCanvas(puz);

function getColor(num) {
	switch (num) {
		case 0:
			return "black";
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
	for (let row = 0; row < puzzle.shape.length; row++) {
		for (let col = 0; col < puzzle.shape[0].length; col++) {
			ctx.fillStyle = getColor(puzzle.shape[row][col]);
			ctx.fillRect(
				(col + 1) * board.canvas_square_size,
				(row + 1) * board.canvas_square_size,
				board.canvas_square_size,
				board.canvas_square_size
			);
		}
	}
}
