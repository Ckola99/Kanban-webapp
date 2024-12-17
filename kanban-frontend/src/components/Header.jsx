import logoLightMobile from "../assets/logo-mobile.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import chevronUp from "../assets/icon-chevron-up.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import hide from "../assets/icon-hide-sidebar.svg";
import logoDark from "../assets/logo-dark.svg";
import logoLight from "../assets/logo-light.svg";
import { useSelector, useDispatch } from "react-redux";
import { currentBoardSelector, setCurrentBoard, addBoardModalOpen, selectSidebarState, sidebarOpen, sidebarClose } from "../features/boards/boardsSlice"
import PropTypes from "prop-types";
import React, { useState } from 'react';
import AddNewTaskModal from './AddNewTaskModal';
import HamburgerDropdown from './HamburgerDropdown';
import DeleteBoard from './DeleteBoard';
import DarkModeToggle from "./DarkModeToggle";
import { useNavigate } from "react-router-dom"



const Header = ({ setIsDropdownOpen, isDropdownOpen }) => {
	const [isAddNewTaskModalOpen, setAddNewTaskModalOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [isDeleteBoard, setDeleteBoard] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();



	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const currentBoard = useSelector(currentBoardSelector);
	const isBoardEmpty = currentBoard?.columns.length === 0;
	const noBoards = !currentBoard;
	const boards = useSelector((state) => state.boards.boards);
	const sidebarIsOpen = useSelector(selectSidebarState);
	const theme = useSelector((state) => state.theme.isDarkMode)

	const handleBoardSelection = (boardId) => {
		const boardIndex = boards.findIndex(
			(board) => board.id === boardId
		); // Find the index by name
		if (boardIndex !== -1) {
			dispatch(setCurrentBoard(boardIndex)); // Dispatch the index
			close();
		} else {
			console.error("Board not found:");
		}
	}

	const handleAddBoard = () => {
		dispatch(addBoardModalOpen())
		close()
	}

	return (
		<div className="h-16 w-full dark:bg-primary-gray flex px-4 justify-between bg-white fixed left-0 right-0 top-0 z-50">
			<nav
				className={`h-full
				md:flex hidden md:flex-col bg-white dark:bg-primary-gray md:-mx-4 border-r dark:border-secondary-gray ${
					sidebarIsOpen
						? "w-[261px]"
						: "w-[250px]"
				} transition-all duration-300 ease-in-out`}
			>
				<img
					src={theme ? logoLight : logoDark}
					alt="company logo"
					className="max-w-[152px] h-[25px] m-5"
				/>
				{sidebarIsOpen && (
					<div
						className={`w-[261px] dark:bg-primary-gray bg-white min-h-[100vh] border-r dark:border-secondary-gray border-white z-50 py-6 flex flex-col`}
					>
						<h1
							id="boards-modal-label"
							className={`  font-bold text-xs uppercase text-tertiary-gray tracking-[2.4px] ml-5 mb-4`}
						>
							all boards (
							{boards?.length})
						</h1>
						<ul className="flex flex-col mb-4">
							{boards &&
								boards.map(
									(
										board
									) => (
										<li
											key={
												board.id
											}
										>
											<button
												className={` w-[240px] h-12 flex items-center pl-5 capitalize ${
													board?.id ===
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
									)
								)}
							<li>
								<button
									className={`med-heading text-primary-blue w-[240px] h-12 flex items-center pl-5 dark:hover:text-white group`}
									onClick={
										handleAddBoard
									}
								>
									<svg
										width="16"
										height="16"
										xmlns="http://www.w3.org/2000/svg"
										className="fill-primary-blue mr-3 group-hover:fill-black dark:group-hover:fill-white"
										aria-hidden="true"
									>
										<path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
									</svg>
									<span className="group-hover:text-black dark:group-hover:text-white">
										+
										Create
										New
										Board
									</span>
								</button>
							</li>
						</ul>
						<div className="mt-auto mb-20 flex flex-col gap-8">
							<DarkModeToggle />
							<button
								onClick={() =>
									dispatch(
										sidebarClose()
									)
								}
								className="text-left pl-5 flex items-center gap-2 text-tertiary-gray med-heading"
							>
								<img
									src={
										hide
									}
									alt="hide button"
								/>
								Hide Sidebar
							</button>
						</div>
					</div>
				)}
			</div>

			{/* left side */}
			<div className={`flex items-center md:w-full`}>
				<img
					src={logoLightMobile}
					alt="Company logo"
					className="md:hidden"
				/>
				<div className={` flex-center  `}>
					<h2
						className={` dark:text-white text-[18px] font-bold mr-2 ml-4 md:pl-5 `}
					>
						{currentBoard?.name ||
							"No board selected"}
					</h2>

					<button
						onClick={toggleDropdown}
						aria-expanded={isDropdownOpen}
						aria-controls="boards-modal"
						aria-label={
							isDropdownOpen
								? "Close dropdown"
								: "Open dropdown"
						}
						className="hover:cursor-pointer md:hidden"
					>
						<img
							src={
								isDropdownOpen
									? chevronUp
									: chevronDown
							}
							alt={
								isDropdownOpen
									? "Close dropdown"
									: "Open dropdown"
							}
						/>
					</button>
				</div>
			</nav>



			{/* right side */}
			<div className="flex items-center">
				<button
					onClick={() => navigate('/workpage')}
					className={` bg-primary-blue ${
						noBoards
							? "bg-opacity-25 cursor-not-allowed"
							: "bg-opacity-100"
					} max-sm:hidden md:flex flex-center rounded-2xl mr-4 h-8 w-[164px] hover:bg-secondary-blue font-bold text-white`}
					disabled={noBoards} >
						Work on tasks
				</button>
				<button
					onClick={
						currentBoard?.columns.length > 0
							? () =>
									setAddNewTaskModalOpen(
										true
									)
							: null
					}
					aria-label="Add Task"
					className={` bg-primary-blue ${
						noBoards
							? "bg-opacity-25 cursor-not-allowed"
							: "bg-opacity-100"
					} w-12 h-8 flex-center rounded-2xl mr-4 md:w-[164px] hover:bg-secondary-blue`}
					disabled={noBoards}
				>
					<img
						src={addTask}
						alt="Add Task Icon"
						className={`
							${isBoardEmpty && "opacity-50"} md:hidden
						`}
					/>
					<p className="hidden md:block text-white med-heading">
						+ Add New Task{" "}
					</p>
				</button>
				<button
					aria-label="Menu"
					onClick={() =>
						setIsOpen((prev) => !prev)


					}
					disabled={noBoards}
				>
					<img
						src={hamburger}
						alt="Open menu"
						className={
							noBoards
								? "opacity-50"
								: ""
						}
					/>
				</button>
			</div>
			{isAddNewTaskModalOpen && (
				<AddNewTaskModal
					closeAddTaskModal={() =>
						setAddNewTaskModalOpen(false)
					}
				/>
			)}
			{isOpen && (
				<HamburgerDropdown
					closeHamburger={() =>{ setIsOpen(false) }}
					openDeleteModal={() =>
						setDeleteBoard(true)
					}
				/>
			)}
			{isDeleteBoard && (
				<DeleteBoard
					closeDeleteModal={() =>
						setDeleteBoard(false)
					}
					board={currentBoard}
				/>
			)}
		</div>
	);
};


Header.propTypes = {
	setIsDropdownOpen: PropTypes.func.isRequired,
	isDropdownOpen: PropTypes.bool.isRequired,
};

export default Header;
