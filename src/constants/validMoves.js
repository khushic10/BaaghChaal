// src/constants/validMoves.js

export const validMoves = {
	0: [1, 6, 5],
	1: [0, 2, 6],
	2: [1, 3, 6, 7, 8],
	3: [2, 4, 8],
	4: [3, 8, 9],
	5: [0, 10, 6],
	6: [0, 1, 2, 5, 7, 10, 11, 12],
	7: [2, 6, 12, 8],
	8: [2, 3, 4, 7, 9, 12, 13, 14],
	9: [4, 8, 14],
	10: [5, 6, 11, 15, 16],
	11: [6, 10, 12, 16],
	12: [6, 7, 8, 11, 13, 16, 17, 18],
	13: [8, 12, 14, 18],
	14: [9, 8, 13, 18, 19],
	15: [10, 16, 20],
	16: [10, 11, 12, 15, 17, 20, 21, 22],
	17: [12, 16, 18, 22],
	18: [12, 13, 14, 17, 19, 22, 23, 24],
	19: [14, 18, 24],
	20: [15, 16, 21],
	21: [16, 20, 22],
	22: [16, 17, 18, 21, 23],
	23: [18, 22, 24],
	24: [18, 19, 23],
};
