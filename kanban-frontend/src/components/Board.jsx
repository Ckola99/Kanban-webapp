import Columns from "./Columns";
import {
	addBoardModalOpen, currentBoardSelector,
	selectEditBoardModalState,
	selectAddBoardModalState,
  editBoardModalOpen, selectSidebarState, sidebarOpen
} from "../features/boards/boardsSlice";
import { useSelector, useDispatch } from "react-redux";
import EditBoardModal from "./EditBoardModal";
import AddBoardModal from "./AddBoardModal";
import show from "../assets/icon-show-sidebar.svg";


const Board = () => {
  const currentBoard = useSelector(currentBoardSelector);
  const openBoardEditModal = useSelector(selectEditBoardModalState);
  const openBoardAddModal = useSelector(selectAddBoardModalState);
  const sidebarIsOpen = useSelector(selectSidebarState);
  const dispatch = useDispatch();

  // Handle if no current board is available
  if (!currentBoard) {
    return (
		<div className={`min-h-[calc(100vh-64px)] flex flex-col justify-center items-center p-5 ${sidebarIsOpen && 'ml-[261px]'} scrollbar-hidden`}>
			<p className="text-tertiary-gray large-heading mb-5 text-center">
				This account has no boards. Create a new board
				to get started.
			</p>
			<button
				onClick={() => dispatch(addBoardModalOpen())}
				className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white"
			>
				+ Create New Board
			</button>
			{openBoardAddModal && <AddBoardModal />}
			{!sidebarIsOpen && (
				<button
					onClick={() => dispatch(sidebarOpen())}
					className="w-[56px] h-[48px] fixed bg-primary-blue bottom-0 left-0 z-index-[66] items-center justify-center rounded-l rounded-full mb-10 hidden md:flex"
				>
					<img
						src={show}
						alt="show visibility icon"
					/>
				</button>
			)}
		</div>
    );
  }

  const boardClass =
		currentBoard.columns.length === 0
			? "flex justify-center items-center px-6 relative scrollbar-hide"
			: "min-h-[calc(100vh-64px)] relative scrollbar-hide";

  return (
		<div className={boardClass}>
			{currentBoard.columns.length === 0 ? (
				<div>
					<p className="text-tertiary-gray large-heading mb-5 text-center">
						This board is empty. Create a
						new column to get started.
					</p>
					<button
						onClick={() =>
							dispatch(
								editBoardModalOpen()
							)
						}
						className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white"
					>
						+ Add New Column
					</button>
				</div>
			) : (
					<Columns  />

			)}
			{openBoardEditModal && <EditBoardModal />}
			{openBoardAddModal && <AddBoardModal />}
			{!sidebarIsOpen && (<button onClick={() => dispatch(sidebarOpen())} className="hover:bg-secondary-blue w-[56px] h-[48px] fixed bg-primary-blue bottom-0 left-0 z-index-[66] items-center justify-center rounded-l rounded-full mb-10 hidden md:flex">
				<img src={show} alt="show visibility icon" />
			</button>)}
		</div>
  );
};

export default Board;
