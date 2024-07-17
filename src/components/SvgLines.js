// src/components/SvgLines.js

import React from "react";

const SvgLines = () => {
	return (
		<>
			{/* Horizontal lines */}
			<line x1="10" y1="10" x2="300" y2="10" stroke="black" />
			<line x1="10" y1="95" x2="300" y2="95" stroke="black" />
			<line x1="10" y1="180" x2="300" y2="180" stroke="black" />
			{/* Vertical lines */}
			<line x1="10" y1="10" x2="10" y2="180" stroke="black" />
			<line x1="155" y1="10" x2="155" y2="180" stroke="black" />
			<line x1="300" y1="10" x2="300" y2="180" stroke="black" />
			{/* Cross diagonal lines */}
			<line x1="10" y1="10" x2="300" y2="180" stroke="black" />
			<line x1="10" y1="180" x2="300" y2="10" stroke="black" />
			{/* Vertical middles */}
			<line x1="82.5" y1="10" x2="82.5" y2="180" stroke="black" />
			<line x1="227.5" y1="10" x2="227.5" y2="180" stroke="black" />
			{/* Horizontal middles */}
			<line x1="10" y1="52.5" x2="300" y2="52.5" stroke="black" />
			<line x1="10" y1="137.5" x2="300" y2="137.5" stroke="black" />
			{/* Diagonal diamonds */}
			<line x1="155" y1="10" x2="10" y2="95" stroke="black" />
			<line x1="155" y1="180" x2="10" y2="95" stroke="black" />
			<line x1="155" y1="180" x2="300" y2="95" stroke="black" />
			<line x1="155" y1="10" x2="300" y2="95" stroke="black" />
		</>
	);
};

export default SvgLines;
