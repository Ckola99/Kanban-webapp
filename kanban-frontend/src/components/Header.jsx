import logoLightMobile from "../assets/logo-mobile.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import chevronUp from "../assets/icon-chevron-up.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";
import { useSelector } from "react-redux";
import { currentBoardSelector } from "../features/boards/boardsSlice"
import PropTypes from "prop-types";
import React, { useState } from 'react';
import AddNewTaskModal from './AddNewTaskModal'

const Header = ({ setIsDropdownOpen, isDropdownOpen }) => {

	const [isAddNewTaskModalOpen, setAddNewTaskModalOpen] = useState(false)
	const toggleDropdown = () => {
		setIsDropdownOpen((prev) => !prev);
	};

	const currentBoard = useSelector(currentBoardSelector);

	return (
		<div className="h-16 w-full dark:bg-secondary-black flex px-4 justify-between bg-white fixed left-0 right-0 top-0 z-50">
			{/* left side */}
			<div className="flex-center">
				<img src={logoLightMobile} alt="Company logo" />
				<div className="flex-center ml-3">
					<h3 className="dark:text-white text-[18px] font-bold mr-2">
						{currentBoard.name}
					</h3>

					<button
						onClick={toggleDropdown}
						aria-expanded={isDropdownOpen}
						aria-controls="boards-modal"
						aria-label={
							isDropdownOpen
								? "Close dropdown"
								: "Open dropdown"
						}
						className="hover:cursor-pointer"
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
			</div>

			{/* right side */}
			<div className="flex items-center">
				<button
					onClick={ currentBoard.columns.length > 0 && (() => setAddNewTaskModalOpen(true))}
					aria-label="Add Task"
					className={`bg-primary-blue ${currentBoard.columns.length === 0 ? 'bg-opacity-25' : 'bg-opacity-100'} w-12 h-8 flex-center rounded-2xl mr-4 `}
				>
					<img
						src={addTask}
						alt="Add Task Icon"
					/>
				</button>
				<button aria-label="Menu">
					<img
						src={hamburger}
						alt="Open menu"
					/>
				</button>
			</div>
			{isAddNewTaskModalOpen && <AddNewTaskModal closeAddTaskModal={() => setAddNewTaskModalOpen(false)} />}
		</div>
	);
};

Header.propTypes = {
	setIsDropdownOpen: PropTypes.func.isRequired,
	isDropdownOpen: PropTypes.bool.isRequired,
};

export default Header;
