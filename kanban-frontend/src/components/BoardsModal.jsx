import React from "react";
import { useSelector, useDispatch } from "react-redux";
import DarkModeToggle from "./DarkModeToggle";
import PropTypes from "prop-types";
import {
	setCurrentBoard,
	currentBoardSelector,
	addBoardModalOpen,
} from "../features/boards/boardsSlice";

const BoardsModal = ({ close }) => {
	const boards = useSelector((state) => state.boards.boards);
	const dispatch = useDispatch();
	const currentBoard = useSelector(currentBoardSelector);

	const handleBoardSelection = (boardId) => {
		const boardIndex = boards.findIndex(
			(board) => board.id === boardId
		); // Find the index by name
		if (boardIndex !== -1) {
			dispatch(setCurrentBoard(boardIndex)); // Dispatch the index
			close();
		} else {
			console.error("Board not found:", name);
		}
	}

	const handleAddBoard = () => {
		dispatch(addBoardModalOpen())
		close()
	}


	return (
			<div
				className="fixed inset-0 flex justify-center bg-[#000000] bg-opacity-50 transition-colors z-[45]"
				role="dialog"
				aria-labelledby="boards-modal-label"
				onClick={close}
			>
				<div
					className="w-[264px] max-h-96 bg-white rounded-xl mt-[82px] py-4 flex flex-col dark:bg-primary-gray dark:shadow-xl dark:shadow-primary-blue/5 overflow-y-auto"
					onClick={(e) => e.stopPropagation()}
					role="document"
				>
					<h1
						id="boards-modal-label"
						className="font-bold text-xs uppercase text-tertiary-gray tracking-[2.4px] ml-5 mb-4"
					>
						all boards ({boards?.length})
					</h1>
					<ul className="flex flex-col mb-4">
						{boards &&
							boards.map((board) => (
								<li
									key={
										board.id
									}
								>
									<button
										className={` w-[240px] h-12 flex items-center pl-5 capitalize ${
											board.id ===
											currentBoard.id
												? "bg-primary-blue rounded-r-full text-white"
												: " text-tertiary-gray"
										} `}
										onClick={() =>
											handleBoardSelection(
												board.id
											)
										}
										aria-pressed={
											board.id ===
											currentBoard.id
										}
									>
										<svg
											width="16"
											height="16"
											xmlns="http://www.w3.org/2000/svg"
											aria-hidden="true"
											className={` ${
												board.id ===
												currentBoard.id
													? "fill-white"
													: "fill-[#828FA3]"
											}`}
										>
											<path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
										</svg>
										<p
											className={`ml-3 med-heading `}
										>
											{
												board.name
											}
										</p>
									</button>
								</li>
							))}
						<li>
							<button
								className={`w-[240px] h-12 flex items-center pl-5 text-tertiary-gray`}
								onClick={
									handleAddBoard
								}
							>
								<svg
									width="16"
									height="16"
									xmlns="http://www.w3.org/2000/svg"
									className="fill-primary-blue"
									aria-hidden="true"
								>
									<path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
								</svg>
								<p className="ml-3 med-heading text-primary-blue dark:hover:text-white hover:text-[#000000]">
									+ Create
									New
									Board
								</p>
							</button>
						</li>
					</ul>
					<div className="justify-between">
						<DarkModeToggle />
					</div>
				</div>
			</div>
	);
};

BoardsModal.propTypes = {
  close: PropTypes.func.isRequired,
};

export default BoardsModal;
