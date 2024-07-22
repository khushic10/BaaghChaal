import { useState, useEffect } from "react";
import { crossPoints } from "../constants/crossPoints";
import { validMoves } from "../constants/validMoves";

const useBoard = (initialTigerPositions, initialGoatPositions) => {
	const [tigerPositions, setTigerPositions] = useState(() => {
		const saved = localStorage.getItem("tigerPositions");
		return saved ? JSON.parse(saved) : initialTigerPositions;
	});
	const [goatPositions, setGoatPositions] = useState(() => {
		const saved = localStorage.getItem("goatPositions");
		return saved ? JSON.parse(saved) : initialGoatPositions;
	});
	const [selectedIcon, setSelectedIcon] = useState("");
	const [selectedPosition, setSelectedPosition] = useState(null);
	const [turn, setTurn] = useState(localStorage.getItem("turn") || "goat");
	const [goatCount, setGoatCount] = useState(
		Number(localStorage.getItem("goatCount")) || 0
	);
	const [goatKill, setGoatKill] = useState(
		Number(localStorage.getItem("goatKill")) || 0
	);
	const [gameStatus, setGameStatus] = useState(
		localStorage.getItem("gameStatus") || "ongoing"
	);

	useEffect(() => {
		localStorage.setItem("tigerPositions", JSON.stringify(tigerPositions));
	}, [tigerPositions]);

	useEffect(() => {
		localStorage.setItem("goatPositions", JSON.stringify(goatPositions));
	}, [goatPositions]);

	useEffect(() => {
		localStorage.setItem("turn", turn);
	}, [turn]);

	useEffect(() => {
		localStorage.setItem("goatCount", goatCount);
	}, [goatCount]);

	useEffect(() => {
		localStorage.setItem("goatKill", goatKill);
	}, [goatKill]);

	useEffect(() => {
		localStorage.setItem("gameStatus", gameStatus);
	}, [gameStatus]);

	const isValidMove = (selected, target, icon) => {
		const selectedId = crossPoints.findIndex(
			(point) => point.x === selected.x && point.y === selected.y
		);
		const targetId = crossPoints.findIndex(
			(point) => point.x === target.x && point.y === target.y
		);

		if (validMoves[selectedId]?.includes(targetId)) {
			return true;
		} else if (icon === "tiger") {
			for (let move of validMoves[selectedId]) {
				const midPoint = crossPoints[move];
				const isGoat = goatPositions.some(
					(g) => g.x === midPoint.x && g.y === midPoint.y
				);

				const midId = crossPoints.findIndex(
					(point) => point.x === midPoint.x && point.y === midPoint.y
				);

				if (isGoat && validMoves[midId]?.includes(targetId)) {
					const isEmpty =
						!tigerPositions.some((t) => t.x === target.x && t.y === target.y) &&
						!goatPositions.some((g) => g.x === target.x && g.y === target.y);

					if (isEmpty) {
						const dx1 = midPoint.x - selected.x;
						const dy1 = midPoint.y - selected.y;
						const dx2 = target.x - midPoint.x;
						const dy2 = target.y - midPoint.y;

						const isStraightLine =
							(dx1 === dx2 && dy1 === dy2) || (dx1 === -dx2 && dy1 === -dy2);

						if (isStraightLine) {
							return true;
						}
					}
				}
			}
		}

		return false;
	};

	const removeGoat = (from, to) => {
		const selectedId = crossPoints.findIndex(
			(point) => point.x === from.x && point.y === from.y
		);
		const targetId = crossPoints.findIndex(
			(point) => point.x === to.x && point.y === to.y
		);

		for (let move of validMoves[selectedId]) {
			const midPoint = crossPoints[move];
			const isGoat = goatPositions.some(
				(g) => g.x === midPoint.x && g.y === midPoint.y
			);

			const midId = crossPoints.findIndex(
				(point) => point.x === midPoint.x && point.y === midPoint.y
			);

			if (isGoat && validMoves[midId]?.includes(targetId)) {
				const dx1 = midPoint.x - from.x;
				const dy1 = midPoint.y - from.y;
				const dx2 = to.x - midPoint.x;
				const dy2 = to.y - midPoint.y;

				const isStraightLine =
					(dx1 === dx2 && dy1 === dy2) || (dx1 === -dx2 && dy1 === -dy2);

				if (isStraightLine) {
					setGoatPositions((prev) => {
						const newPositions = prev.filter(
							(g) => !(g.x === midPoint.x && g.y === midPoint.y)
						);
						setGoatKill((prev) => {
							const newGoatKill = prev + 1;
							localStorage.setItem("goatKill", newGoatKill);
							return newGoatKill;
						});
						return newPositions;
					});
				}
			}
		}
	};

	const moveIcon = (icon, from, to) => {
		if (isValidMove(from, to, icon)) {
			if (icon === "tiger") {
				setTigerPositions((prev) => {
					const newPositions = prev.map((t) =>
						t.x === from.x && t.y === from.y ? to : t
					);
					return newPositions;
				});
				removeGoat(from, to);
			} else if (icon === "goat") {
				setGoatPositions((prev) => {
					const newPositions = prev.map((g) =>
						g.x === from.x && g.y === from.y ? to : g
					);
					return newPositions;
				});
			}
			setTurn(icon === "tiger" ? "goat" : "tiger");
		} else {
			alert("Invalid Move!");
		}
	};

	const handleIconClick = (point, icon) => {
		if (gameStatus !== "ongoing") {
			alert("Game over. Please reset the game.");
			return;
		}

		if (icon === turn) {
			if (icon === "goat" && goatCount < 20) {
				alert("You cannot move goat unless you add all 20 goats");
			} else {
				setSelectedIcon(icon);
				setSelectedPosition(point);
			}
		} else {
			alert("Not your Turn");
		}
	};

	const handlePointClick = (targetPoint) => {
		if (gameStatus !== "ongoing") {
			alert("Game over. Please reset the game.");
			return;
		}

		if (selectedIcon && selectedPosition) {
			moveIcon(selectedIcon, selectedPosition, targetPoint);
			setSelectedIcon("");
			setSelectedPosition(null);
		} else if (turn === "goat" && goatCount < 20) {
			setGoatPositions((prev) => {
				const newPositions = [...prev, targetPoint];
				return newPositions;
			});

			setGoatCount((prev) => {
				const newGoatCount = prev + 1;
				localStorage.setItem("goatCount", newGoatCount);
				return newGoatCount;
			});
			setTurn("tiger");
		}
	};

	const isPointOccupied = (point) => {
		return (
			tigerPositions.some((t) => t.x === point.x && t.y === point.y) ||
			goatPositions.some((g) => g.x === point.x && g.y === point.y)
		);
	};

	const findAllTigerMoves = () => {
		let validTigerMoves = {};

		tigerPositions.forEach((tiger) => {
			const tigerId = crossPoints.findIndex(
				(point) => point.x === tiger.x && point.y === tiger.y
			);

			validMoves[tigerId].forEach((moveId) => {
				const targetPoint = crossPoints[moveId];
				if (
					!isPointOccupied(targetPoint) &&
					isValidMove(tiger, targetPoint, "tiger")
				) {
					if (!validTigerMoves[tigerId]) {
						validTigerMoves[tigerId] = [];
					}
					validTigerMoves[tigerId].push(targetPoint);
				}
			});
		});

		return validTigerMoves;
	};

	const checkWinCondition = () => {
		if (goatKill >= 5) {
			setGameStatus("tiger_wins");
			alert("Tiger wins!");
		} else {
			const validTigerMoves = findAllTigerMoves();
			console.log(validTigerMoves);
			const canAnyTigerMove = Object.keys(validTigerMoves).length > 0;

			if (!canAnyTigerMove) {
				setGameStatus("goat_wins");
				alert("Goat wins!");
			}
		}
	};
	useEffect(() => {
		checkWinCondition();
	}, [goatPositions, tigerPositions]);

	return {
		tigerPositions,
		setTigerPositions,
		goatPositions,
		setGoatPositions,
		crossPoints,
		turn,
		setTurn,
		goatCount,
		setGoatCount,
		goatKill,
		setGoatKill,
		gameStatus,
		setGameStatus,
		handleIconClick,
		handlePointClick,
	};
};

export default useBoard;
