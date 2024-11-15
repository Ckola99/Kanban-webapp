import Columns from "./Columns";
import { currentBoardSelector } from "../features/boards/boardsSlice";
import { useSelector } from "react-redux";

const Board = () => {
	const currentBoard = useSelector(currentBoardSelector);
	console.log(currentBoard);

	const boardClass =
		currentBoard.columns.length === 0
			? "flex justify-center items-center text-center min-h-[calc(100vh-64px)] px-6"
			: "min-h-[calc(100vh-64px)]";

	return (
		<div className={boardClass}>
			{currentBoard.columns.length === 0 ? (
				<div className="">
					<p className="text-tertiary-gray large-heading mb-5">
						This board is empty. Create a
						new column to get started.
					</p>
					<button className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white">
						+ Add New Column
					</button>
				</div>
			) : (
				<Columns />
			)}
		</div>
	);
};
export default Board;
