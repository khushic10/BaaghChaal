import Board from "./components/Board";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const initialTigerPositions = [
		{ id: 0, x: 10, y: 10 },
		{ id: 4, x: 300, y: 10 },
		{ id: 20, x: 10, y: 180 },
		{ id: 24, x: 300, y: 180 },
	];

	const initialGoatPositions = [];
	return (
		<div className="App">
			<Board
				initialGoatPositions={initialGoatPositions}
				initialTigerPositions={initialTigerPositions}
			/>
		</div>
	);
}

export default App;
