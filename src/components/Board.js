import React, { useState } from "react";
import "../styles/Board.scss";
import { GiTigerHead } from "react-icons/gi";
import { GiGoat } from "react-icons/gi";
import useBoard from "../Hooks/useBoard";
import SvgLines from "./SvgLines";

const Board = ({ initialGoatPositions, initialTigerPositions }) => {
	const {
		tigerPositions,
		setTigerPositions,
		goatPositions,
		setGoatPositions,
		crossPoints,
		turn,
		setTurn,
		setGoatCount,
		setGoatKill,
		setGameStatus,
		handleIconClick,
		handlePointClick,
	} = useBoard(initialTigerPositions, initialGoatPositions);

	const [selectedIconId, setSelectedIconId] = useState(null);

	const handleClick = (point, type) => {
		handleIconClick(point, type);
		setSelectedIconId(point.id);
	};

	const handleOtherPointClick = (point) => {
		handlePointClick(point);
		setSelectedIconId(null);
	};

	const handleResetClick = () => {
		setTigerPositions(initialTigerPositions);
		setGoatPositions(initialGoatPositions);
		localStorage.setItem("goatPositions", JSON.stringify(initialGoatPositions));
		localStorage.setItem(
			"tigerPositions",
			JSON.stringify(initialTigerPositions)
		);
		localStorage.setItem("turn", "goat");
		setTurn("goat");
		localStorage.setItem("goatCount", 0);
		setGoatCount(0);
		localStorage.setItem("goatKill", 0);
		setGoatKill(0);
		localStorage.setItem("gameStatus", "ongoing");
		setGameStatus("ongoing");
	};

	return (
		<div className="board-container">
			<div>
				<button onClick={handleResetClick}>Reset</button>
			</div>
			<div>
				<svg viewBox="0 0 310 190" className="board-svg">
					<SvgLines />
					{crossPoints.map((point, index) => (
						<g key={index} onClick={() => handleOtherPointClick(point)}>
							<circle cx={point.x} cy={point.y} r="5" fill="red" opacity={0} />
						</g>
					))}
					{tigerPositions.map((point, index) => (
						<g
							key={index}
							onClick={() => handleClick(point, "tiger")}
							style={{ cursor: "pointer" }}
						>
							<circle
								cx={point.x + 1}
								cy={point.y + 1}
								r="11"
								fill="white"
								stroke={
									selectedIconId === point.id && turn === "tiger"
										? "orange"
										: "white"
								}
								strokeWidth={selectedIconId === point.id ? 2 : 1}
							/>
							<g transform={`translate(${point.x - 9}, ${point.y - 9})`}>
								<GiTigerHead size={20} style={{ color: "#fd6a02" }} />
							</g>
						</g>
					))}
					{goatPositions.map((point, index) => (
						<g key={index} onClick={() => handleClick(point, "goat")}>
							<circle
								cx={point.x - 1}
								cy={point.y}
								r="10"
								fill="white"
								stroke={
									selectedIconId === point.id && turn === "goat"
										? "orange"
										: "white"
								}
								strokeWidth={selectedIconId === point.id ? 2 : 1}
							/>
							<g transform={`translate(${point.x - 9}, ${point.y - 9})`}>
								<GiGoat size={16} style={{ color: "#876769" }} />
							</g>
						</g>
					))}
				</svg>
			</div>
		</div>
	);
};

export default Board;
