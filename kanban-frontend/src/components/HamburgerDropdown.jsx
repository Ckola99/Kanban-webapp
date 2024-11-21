import React from 'react';
import { editBoardModalOpen } from "../features/boards/boardsSlice";
import { useDispatch } from "react-redux";


const HamburgerDropdown = ({ closeHamburger, openDeleteModal }) => {
	const dispatch = useDispatch()

	const handleDelete = () => {
		closeHamburger()
		openDeleteModal()
	}

	const handleEdit = () => {
		closeHamburger()
		dispatch(editBoardModalOpen())
	}

  return (
    	<div className="absolute z-[61] -right-10 top-[68px]">
		<div className=" dark:bg-primary-black bg-white h-24 w-[192px] flex flex-col justify-between p-4 rounded-lg ">
			<button onClick={handleEdit} className="text-tertiary-gray text-left large-body">
				Edit Board
			</button>
			<button onClick={handleDelete} className="text-red text-left large-body items-center">
				Delete Board
			</button>
		</div>
	</div>
  )
}

export default HamburgerDropdown;
