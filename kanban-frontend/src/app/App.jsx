import React from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import Header from "../components/Header";
import Board from "../components/Board";

function App() {

	return (
		<div className="font-plus-jakarta dark:bg-primary-black min-h-screen bg-primary-light-gray flex-center">
			<Header />
			<Board />
		</div>
	);
}

export default App;
