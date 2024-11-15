import React, {useState} from "react";
import Header from "../components/Header";
import Board from "../components/Board";
import BoardsModal from "../components/BoardsModal";

function App() {

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const closeDropdown = () => setIsDropdownOpen(false);
	const currentBoard = useSelector(currentBoardSelector);


	return (
		<div className="font-plus-jakarta dark:bg-primary-black min-h-screen bg-primary-light-gray flex-center">
			<Header setIsDropdownOpen={setIsDropdownOpen} isDropdownOpen={isDropdownOpen}/>
			{isDropdownOpen && <BoardsModal isDropdownOpen={isDropdownOpen} close={closeDropdown}/>}
			<Board />
		</div>
	);
}

export default App;
