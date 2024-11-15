import Columns from "./Columns";
import { currentBoardSelector } from "../features/boards/boardsSlice"
import { useSelector } from "react-redux";


const Board = () => {
  return (
		<div className="">
			<div className="px-6 text-center">
				<p className="text-tertiary-gray large-heading mb-5">
					This board is empty. Create a new column
					to get started.
				</p>
				<button className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white">
					+ Add New Column
				</button>
			</div>
			<Columns />

		</div>
  );
}
export default Board
