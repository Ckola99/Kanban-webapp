import Columns from "./Columns";
import { currentBoardSelector, selectEditBoardModalState } from "../features/boards/boardsSlice";
import { useSelector } from "react-redux";
import EditBoardModal from "./EditBoardModal";


const Board = () => {
  const currentBoard = useSelector(currentBoardSelector);
  const openBoardEditModal = useSelector(selectEditBoardModalState);

  // Handle if no current board is available
  if (!currentBoard) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center p-5">
        <p className="text-tertiary-gray large-heading mb-5">
            This account has no boards. Create a new board to get started.
          </p>
          <button className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white">
            + Create New Board
          </button>
      </div>
    );
  }

  const boardClass =
    currentBoard.columns.length === 0
      ? "flex justify-center items-center text-center min-h-[calc(100vh-64px)] px-6"
      : "min-h-[calc(100vh-64px)]";

  return (
    <div className={boardClass}>
      {currentBoard.columns.length === 0 ? (
        <div>
          <p className="text-tertiary-gray large-heading mb-5">
            This board is empty. Create a new column to get started.
          </p>
          <button className="bg-primary-blue h-12 w-44 rounded-3xl med-heading text-white">
            + Add New Column
          </button>
        </div>
      ) : (
        <Columns/>
      )}
      {openBoardEditModal && <EditBoardModal />}
    </div>
  );
};

export default Board;
