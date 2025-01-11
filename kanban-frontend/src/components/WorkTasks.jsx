import React, { useState, useEffect } from 'react'
import {
	updateSubtask,
	currentBoardSelector
} from "../features/boards/boardsSlice";
import Subtasks from '../components/Subtasks'
import { useSelector, useDispatch } from "react-redux";


const WorkTasks = () => {
	const currentBoard = useSelector(currentBoardSelector);
	const dispatch = useDispatch();

	const [selectedTaskId, setSelectedTaskId] = useState(null)
	const incompleteTasks = currentBoard.columns.flatMap(column =>
		column.tasks.filter(task =>
			task.subtasks.some(subtask => subtask.isCompleted !== true)
		)
	);


	// Check if all tasks and subtasks are completed
	const allTasksComplete = currentBoard.columns.every(column =>
		column.tasks.every(task =>
			task.subtasks.every(subtask => subtask.isCompleted === true)
		)
	);

	const handleTaskClick = (id) => {
		setSelectedTaskId(selectedTaskId === id ? null : id)
	}

	const handleSubtaskToggle = (subtaskId, isCompleted) => {
		dispatch(
			updateSubtask({
				subtaskId,
				isCompleted: isCompleted,
			})
		);
	};

	useEffect(() => {
        	if (!incompleteTasks.some(task => task.id === selectedTaskId)) {
            		setSelectedTaskId(null);
        	}
   	}, [incompleteTasks, selectedTaskId]);

	return (
		<div className={`grid grid-cols-2 gap-2 ${selectedTaskId && 'overflow-scroll overflow-x-hidden scrollbar-webkit'} h-fit`}>

			{allTasksComplete ? (
				<div className="col-span-2 text-center text-primary-blue dark:text-white text-lg font-bold flex items-center justify-center">
					<p>All tasks complete 🎉</p>
				</div>
			) : (
				incompleteTasks.map(task => (
					<div
						key={task.id}
						onClick={() => handleTaskClick(task.id)}
						className={`transition-all duration-300 ease-in-out ${selectedTaskId === task.id ? 'row-span-2 z-10 relative ' : 'col-span-1 hover:cursor-pointer '} group bg-white dark:bg-secondary-black dark:text-white rounded-lg p-4 shadow-md dark:shadow-md relative max-h-fit `}
					>
						<h2
							onClick={(e) => { selectedTaskId && e.stopPropagation() }}
							className={`med-heading mb-2 ${selectedTaskId === task.id
								? '' // No hover effect when selected
								: 'group-hover:text-primary-blue' // Apply hover effect
								}`}
						>
							{task.title}
						</h2>

						{selectedTaskId === task.id ? (
							<div className="">
								<p onClick={(e) => { selectedTaskId && e.stopPropagation() }} className="small-heading">{task.description}</p>
								<form onClick={(e) => e.stopPropagation()}>
									<h2 className="font-bold text-tertiary-gray text-[12px] mb-3">
										Subtasks ({task.subtasks.filter(sub => sub.isCompleted).length} of {task.subtasks.length})
									</h2>
									<Subtasks handleSubtaskToggle={handleSubtaskToggle} card={task} />
								</form>
								<button onClick={() => handleTaskClick(task.id)} className="absolute top-2 right-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:stroke-red">
										<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
								</button>

							</div>
						) : (
							<p className="text-tertiary-gray body-med">
								{task.subtasks.filter(sub => sub.isCompleted).length} of {task.subtasks.length} subtasks
							</p>
						)}
					</div>
				))
			)}
		</div>
	)
}

export default WorkTasks
