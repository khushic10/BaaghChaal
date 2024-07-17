import { useState } from "react";
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
	const [turn, setTurn] = useState("goat");
	const [goatCount, setGoatCount] = useState(0);

	const isValidMove = (selected, target) => {
		const selectedId = crossPoints.findIndex(
			(point) => point.x === selected.x && point.y === selected.y
		);
		const targetId = crossPoints.findIndex(
			(point) => point.x === target.x && point.y === target.y
		);

		return validMoves[selectedId]?.includes(targetId) || false;
	};

	const moveIcon = (icon, from, to) => {
		if (isValidMove(from, to)) {
			if (icon === "tiger") {
				setTigerPositions((prev) => {
					const newPositions = prev.map((t) =>
						t.x === from.x && t.y === from.y ? to : t
					);
					localStorage.setItem("tigerPositions", JSON.stringify(newPositions));
					return newPositions;
				});
			} else if (icon === "goat") {
				setGoatPositions((prev) => {
					const newPositions = prev.map((g) =>
						g.x === from.x && g.y === from.y ? to : g
					);
					localStorage.setItem("goatPositions", JSON.stringify(newPositions));
					return newPositions;
				});
			}
			setTurn(icon === "tiger" ? "goat" : "tiger");
		} else {
			alert("Invalid Move!");
		}
	};

	const handleIconClick = (point, icon) => {
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
		if (selectedIcon && selectedPosition) {
			moveIcon(selectedIcon, selectedPosition, targetPoint);
			setSelectedIcon("");
			setSelectedPosition(null);
		} else if (turn === "goat" && goatCount < 20) {
			setGoatPositions((prev) => {
				const newPositions = [...prev, targetPoint];
				localStorage.setItem("goatPositions", JSON.stringify(newPositions));
				return newPositions;
			});
			setGoatCount(goatCount + 1);
			setTurn("tiger");
		}
	};

	return {
		tigerPositions,
		setTigerPositions,
		goatPositions,
		setGoatPositions,
		crossPoints,
		turn,
		setTurn,
		goatCount,
		handleIconClick,
		handlePointClick,
	};
};

export default useBoard;
