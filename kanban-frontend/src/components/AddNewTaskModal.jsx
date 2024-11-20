import React from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
	currentBoardSelector,
	addNewTask
} from "../features/boards/boardsSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';

// Validation Schema
const validationSchema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup.string().max(500, "Description can't exceed 500 characters"),
  status: yup
    .string()
    .required("Status is required")
    .oneOf(["Todo", "Doing", "Done"], "Invalid status"),
  subtasks: yup
    .array()
    .of(
      yup.object({
        title: yup
          .string()
          .required("Can't be empty")
          .min(2, "Subtask must be at least 2 characters"),
      })
    )
    .min(1, "You must have at least one subtask"),
});

const AddNewTaskModal = ({ closeAddTaskModal }) => {

	const dispatch = useDispatch();
	const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			title: "",
			description:  "",
			status:  "",
			subtasks:  [
            			{ title: "" }, // First subtask
            			{ title: "" }, // Second subtask
       			],
		}
	});
	const currentBoard = useSelector(currentBoardSelector);

	const selectedStatus = watch("status");

	const { fields, append, remove } = useFieldArray({
    		control,
    		name: "subtasks",
  	});

	const onSubmit = (data) => {
		const newTask = {
        title: data.title,
        description: data.description,
        status: data.status,
        subtasks: data.subtasks.map(sub => ({
            title: sub.title,
            isCompleted: false, // Default to false for new subtasks
	    id: uuidv4()
        }))
    };

    dispatch(addNewTask({ newTask })); // Dispatch the addNewTask action
    closeAddTaskModal(); // Close the modal
	}

  	return (
		<div onClick={closeAddTaskModal} className="fixed inset-0 bg-black bg-opacity-50 flex-center p-4 z-[60]">
			<div className="bg-white dark:bg-secondary-black p-4 rounded-lg w-full" onClick={(e) => e.stopPropagation()} >
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex justify-between">
						<h1 className="large-heading dark:text-white">Add New Task</h1>
						<button onClick={closeAddTaskModal} type="button" className="text-red text-xs font-bold">Cancel</button>
					</div>

					{/* Title */}
					<div className="flex flex-col gap-1">
						<label className="font-bold dark:text-white text-xs text-tertiary-gray">Title</label>
						<input
							placeholder={
										errors.title
										? errors.title.message
										: `e.g. build user interface`
							}
							className={` ${errors.title ? 'border-red placeholder:text-red ' : 'dark:border-secondary-gray'}body-large p-3 bg-inherit border rounded-md dark:text-white`}
							type="text"
							{...register("title")}
						/>
					</div>

					{/* Description */}
					<div className="flex flex-col gap-1">
						<label  className="font-bold dark:text-white text-xs text-tertiary-gray">Description</label>
						<textarea
							className="dark:bg-inherit border dar:border-secondary-gray rounded-md dark:text-white p-3 body-large"
							{...register(
								"description"
							)}
							rows="5"
						/>
					</div>

					{/* Subtasks */}
					<div className="flex flex-col gap-2">
						<label className="font-bold dark:text-white text-xs text-tertiary-gray">Subtasks</label>
						{fields.map((field, index) => (
							<div key={field.id} className="flex gap-3">
								<input
									placeholder={
										errors.subtasks?.[index]?.title
										? errors.subtasks[index].title.message
										: `e.g. Subtask ${index + 1}`
									}
									className={`w-full body-large p-3 bg-inherit border  rounded-md dark:text-white ${errors.subtasks?.[index]?.title ? 'border-red placeholder:text-red ' : 'dark:border-secondary-gray'}`}
									type="text"
									{...register(`subtasks.${index}.title`
									)}
								/>
								<button
									type="button"
									className="ml-2"
									onClick={() =>
										remove(
											index
										)
									}
								>
									<svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" className="mr-1 hover:fill-red"><g fill="#828FA3"><path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z"/><path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z"/></g></svg>
								</button>
							</div>
						))}
						<button onClick={() => append({ title: "", isCompleted: false, id: "" })} type="button" className="dark:bg-white p-2 rounded-full text-[13px] font-bold text-primary-blue bg-primary-blue bg-opacity-10">
							+ Add New Subtask
						</button>
					</div>

					{/* Status */}
					<div className="flex flex-col gap-1">
						<label className="text-xs font-bold dark:text-white text-tertiary-gray">Status</label>
						<select
							className="font-bold dark:text-white text-xs border dark:border-secondary-gray px-3 py-2 rounded-md appearance-none bg-[url('./assets/icon-chevron-down.svg')] bg-no-repeat bg-[center_right_12px] dark:bg-inherit"
							{...register("status")}
							value={selectedStatus}
							onChange={(e) =>
								setValue(
									"status",
									e.target
										.value
								)
							}
						>
							{currentBoard.columns.map(
								(column) => (
									<option
										className="dark:bg-secondary-black"
										key={
											column.name
										}
										value={
											column.name
										}
									>
										{
											column.name
										}
									</option>
								)
							)}
						</select>
					</div>

					{/* Buttons */}
					<div className="dark:bg-primary-blue flex-center p-2 rounded-full bg-primary-blue">
						<button
							className="font-bold text-white text-[13px] "
							type="submit"
						>
							Create Task
						</button>
					</div>
				</form>
			</div>
		</div>
  	);
}

export default AddNewTaskModal;
