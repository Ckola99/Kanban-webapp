import { createSlice } from "@reduxjs/toolkit";
import data from '../../../data.json'
import { v4 as uuidv4 } from 'uuid';

const savedBoardIndex = window.localStorage.getItem("currentBoardIndex");
const initialState = {
	boards: JSON.parse(localStorage.getItem('boards')) || data.boards,
	currentBoardIndex: savedBoardIndex ? parseInt(savedBoardIndex, 10) : 0,
	editBoardModal: false,
	addBoardModal: false,
	sidebar: true,
}

const boardsSlice = createSlice({
	name: 'boards',
	initialState,
	reducers: {
		setCurrentBoard: (state, action) => {
			state.currentBoardIndex = action.payload;
			window.localStorage.setItem("currentBoardIndex", action.payload);
		},
		updateCardStatus: (state, action) => {
			const { cardId, newStatus } = action.payload;

			const sourceColumn = state.boards[state.currentBoardIndex].columns.find(column =>
				column.tasks.some(task => task.id === cardId)
			)

			if (sourceColumn) {
				const taskIndex = sourceColumn.tasks.findIndex(task => task.id === cardId);
				const [task] = sourceColumn.tasks.splice(taskIndex, 1);

				task.status = newStatus;

				const targetColumn = state.boards[state.currentBoardIndex].columns.find(column =>
					column.name === newStatus
				);

				// Add the task to the new column
				targetColumn.tasks.push(task);
			}
		},

		updateSubtask: (state, action) => {

			const { subtaskId, isCompleted } = action.payload;

			const task = state.boards[state.currentBoardIndex].columns
				.flatMap(column => column.tasks) // Get all tasks from all columns
				.find(task => task.subtasks.some(sub => sub.id === subtaskId));  // Find the task containing the subtask

			if (task) {
				const subtask = task.subtasks.find(sub => sub.id === subtaskId);
				if (subtask) {
					subtask.isCompleted = isCompleted;
				}
			}
		},

		deleteTask: (state, action) => {
			const { cardId } = action.payload;

			const currentBoard = state.boards[state.currentBoardIndex];
			for (const column of currentBoard.columns) {
				const taskIndex = column.tasks.findIndex(task => task.id === cardId);
				if (taskIndex !== -1) {
					column.tasks.splice(taskIndex, 1);
					break;
				}
			}
		},

		editTask: (state, action) => {
			const { taskId, updatedData } = action.payload;

			// Find the column containing the task
			const sourceColumn = state.boards[state.currentBoardIndex].columns.find(
				column => column.tasks.some(task => task.id === taskId)
			);

			if (sourceColumn) {
				// Find the specific task to edit
				const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
				if (taskIndex !== -1) {
					// Update the task's details
					const task = sourceColumn.tasks[taskIndex];
					task.title = updatedData.title || task.title;
					task.description = updatedData.description || task.description;

					// Update the task's status
					if (task.status !== updatedData.status) {
						// Remove the task from the current column
						sourceColumn.tasks.splice(taskIndex, 1);

						// Find the target column and add the task to it
						const targetColumn = state.boards[state.currentBoardIndex].columns.find(
							column => column.name === updatedData.status
						);

						if (targetColumn) {
							targetColumn.tasks.push({
								...task,
								status: updatedData.status,
							});
						}
					}

					// Update the subtasks
					if (updatedData.subtasks) {

						updatedData.subtasks.forEach(subtask => {
							if (!subtask.id) {
								subtask.id = uuidv4();
							}
						});

						task.subtasks = updatedData.subtasks;
					}

				}
			}
		},

		addNewTask: (state, action) => {
			const { newTask } = action.payload;
			const currentBoard = state.boards[state.currentBoardIndex];

			// Push the new task to the current board's tasks
			currentBoard.columns.forEach(column => {
				if (column.name === newTask.status) {
					column.tasks.push({
						...newTask,
						id: uuidv4(), // Generate a unique task ID
					});
				}
			});
		},

		deleteBoard: (state, action) => {
			const { boardId } = action.payload;

			const deletedBoardIndex = state.boards.findIndex(board => board.id === boardId)

			state.boards = state.boards.filter(board => board.id !== boardId);
			if (deletedBoardIndex === state.currentBoardIndex) {
				if (state.boards.length > 0) {
					state.currentBoardIndex = 0;
					window.localStorage.setItem("currentBoardIndex", 0);
				} else {
					state.currentBoardIndex = 0;
					window.localStorage.removeItem("currentBoardIndex");
				}
			}
			localStorage.setItem('boards', JSON.stringify(state.boards));
		},


		addBoard: (state, action) => {
			const { updatedData } = action.payload;
			const newBoard = {
				id: uuidv4(),
				name: updatedData.name,
				columns: updatedData.columns.map(column => ({
					...column,
					tasks: column.tasks || [], // Ensure each column has an empty tasks array
				})),
			};

			state.boards.push(newBoard);
			localStorage.setItem('boards', JSON.stringify(state.boards));

		},

		editBoard: (state, action) => {
			const { boardId, updatedData } = action.payload;

			// Find the index of the board by its name
			const boardIndex = state.boards.findIndex(board => board.id === boardId);

			if (boardIndex !== -1) {
				// Update the board's details
				const board = state.boards[boardIndex];

				// Update the board's name if provided
				if (updatedData.name) {
					board.name = updatedData.name;
				}

				// Update the board's columns if provided
				if (updatedData.columns) {
					board.columns = updatedData.columns.map(column => {
						// Ensure every column has tasks (if not provided, default to an empty array)
						return {
							...column,
							tasks: column.tasks || [],
						};
					});
				}

				localStorage.setItem('boards', JSON.stringify(state.boards));
			}
		},

		editBoardModalOpen: (state) => {
			state.editBoardModal = true;
		},

		editBoardModalClose: (state) => {
			state.editBoardModal = false;
		},

		addBoardModalOpen: (state) => {
			state.addBoardModal = true;
		},

		addBoardModalClose: (state) => {
			state.addBoardModal = false;
		},

		sidebarOpen: (state) => {
			state.sidebar = true;
		},

		sidebarClose: (state) => {
			state.sidebar = false;
		},

		updateColumnTasks: (state, action) => {
			const { taskId, sourceColumn, destinationColumn } = action.payload;



			// Find source and destination column indices
			const sourceColumnIndex = state.boards[state.currentBoardIndex].columns.findIndex(
				column => sourceColumn.includes(column.name)
			);

			const columns = state.boards[state.currentBoardIndex].columns

			console.log(columns.map(column => column.name))

			console.log("source column", sourceColumnIndex)

			const destColumnIndex = state.boards[state.currentBoardIndex].columns.findIndex(
				column => destinationColumn.includes(column.name)
			);

			console.log(destColumnIndex)

			// Validate indices
			if (sourceColumnIndex === -1 || destColumnIndex === -1) {
				console.error("Invalid source or destination column");
				return;
			}

			// Locate the task
			const task = state.boards[state.currentBoardIndex].columns[sourceColumnIndex]?.tasks.find(
				task => task.id === taskId
			);

			if (!task) {
				console.error("Task not found");
				return;
			}

			// Remove task from source column
			state.boards[state.currentBoardIndex].columns[sourceColumnIndex].tasks =
				state.boards[state.currentBoardIndex].columns[sourceColumnIndex].tasks.filter(
					task => task.id !== taskId
				);

			// Add task to destination column
			state.boards[state.currentBoardIndex].columns[destColumnIndex].tasks.push(task);

			// Optional: Update task metadata
			task.status = destinationColumn; // or other metadata changes
		}


	},
});

export default boardsSlice.reducer;
export const currentBoardSelector = (state) => state.boards.boards[state.boards.currentBoardIndex];
export const { updateColumnTasks, setCurrentBoard, updateCardStatus, updateSubtask, deleteTask, editTask, addNewTask, deleteBoard, editBoardModalOpen, editBoardModalClose, editBoard, addBoardModalOpen, addBoardModalClose, addBoard, sidebarOpen, sidebarClose } = boardsSlice.actions;
export const selectEditBoardModalState = (state) => state.boards.editBoardModal;
export const selectAddBoardModalState = (state) => state.boards.addBoardModal;
export const selectSidebarState = (state) => state.boards.sidebar;
