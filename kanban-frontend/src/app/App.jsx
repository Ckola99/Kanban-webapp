import React from "react";
import DarkModeToggle from "../components/DarkModeToggle";
import Header from "../components/Header";

function App() {

	return (
		<div className="dark:bg-primary-black h-[100vh] bg-">
			<Header />
			<DarkModeToggle className="mt-[300px]" />
		</div>
	);
}

export default App;
