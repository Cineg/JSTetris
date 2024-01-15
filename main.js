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
	draw_canvas(puz);
});

flipLeftButton.addEventListener("click", function (e) {
	puz.flip_left();

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 500, 800);
	draw_canvas(puz);
});

flipRightButton.addEventListener("click", function (e) {
	puz.flip_right();

	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 500, 800);
	draw_canvas(puz);
});

let _currentItem = 1;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let board = new Board(10, 30, canvas.offsetWidth);
console.log(board);

let puz = new Puzzle(4);
puz.flip_left();

ctx.fillStyle = "black";
ctx.fillRect(0, 0, 500, 800);

draw_canvas(puz);

function draw_canvas(puzzle) {
	ctx.fillStyle = "white";
	console.log(puzzle.shape);
	for (let row = 0; row < puzzle.shape.length; row++) {
		console.log(puzzle.shape[0]);
		for (let col = 0; col < puzzle.shape[0].length; col++) {
			if (puzzle.shape[row][col] != 0) {
				ctx.fillRect(
					(col + 1) * board.canvas_square_size,
					(row + 1) * board.canvas_square_size,
					board.canvas_square_size,
					board.canvas_square_size
				);
			}
		}
	}
}
