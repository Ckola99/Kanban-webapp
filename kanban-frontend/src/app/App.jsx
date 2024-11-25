import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import BoardsModal from "../components/BoardsModal";



function App() {

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const closeDropdown = () => setIsDropdownOpen(false);

	useEffect(() => {
    		const savedTheme = localStorage.getItem("theme") || "light";
    		document.body.classList.toggle("dark", savedTheme === "dark");
  	}, []);


	return (
		<div className={`relative font-plus-jakarta dark:bg-primary-black min-h-screen bg-primary-light-gray`}>
			<Header setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen}/>
			{isDropdownOpen && <BoardsModal isDropdownOpen={isDropdownOpen} close={closeDropdown}/>}
			<Board />
		</div>
	);
}

export default App;
