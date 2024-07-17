// Board.js
import React from "react";
import "../styles/Board.scss";

// {/* horizontal */}
// <line x1="10" y1="10" x2="300" y2="10" stroke="black" />
// <line x1="10" y1="95" x2="300" y2="95" stroke="black" />
// <line x1="10" y1="180" x2="300" y2="180" stroke="black" />
// {/* vertical */}
// <line x1="10" y1="10" x2="10" y2="180" stroke="black" />
// <line x1="155" y1="10" x2="155" y2="180" stroke="black" />
// <line x1="300" y1="10" x2="300" y2="180" stroke="black" />
// {/* cross diagonal */}
// <line x1="10" y1="10" x2="300" y2="180" stroke="black" />
// <line x1="10" y1="180" x2="300" y2="10" stroke="black" />
// {/* vertical middles */}
// <line x1="82.5" y1="10" x2="82.5" y2="180" stroke="black" />
// <line x1="227.5" y1="10" x2="227.5" y2="180" stroke="black" />
// {/* horizontal middles */}
// <line x1="10" y1="52.5" x2="300" y2="52.5" stroke="black" />
// <line x1="10" y1="137.5" x2="300" y2="137.5" stroke="black" />
// {/* diagonal diamonds */}
// <line x1="155" y1="10" x2="10" y2="95" stroke="black" />
// <line x1="155" y1="180" x2="10" y2="95" stroke="black" />
// <line x1="155" y1="180" x2="300" y2="95" stroke="black" />
// <line x1="155" y1="10" x2="300" y2="95" stroke="black" />
// {/* {crossPoints.map((point, index) => (
//     <circle key={index} cx={point.x} cy={point.y} r="5" fill="red" />
// ))} */}
const Board = () => {
	const boardSize = 5;
	const board = Array(boardSize)
		.fill(null)
		.map(() => Array(boardSize).fill(null));

	return (
		<div className="board">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="row">
					{row.map((cell, colIndex) => (
						<div key={colIndex} className="cell">
							{/* You can add pieces here later */}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default Board;
