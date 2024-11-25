import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import {
	addBoardModalClose,
	addBoard,
} from "../features/boards/boardsSlice";
import { useDispatch } from "react-redux";

// Validation Schema
const validationSchema = yup.object({
  name: yup
    .string()
    .required("Board name is required")
    .min(3, "Name must be at least 3 characters"),
  columns: yup
    .array()
    .of(
      yup.object({
        name: yup
          .string()
          .required("Column requires a name")
          .min(2, "Name must be at least 2 characters"),
      })
    )
    .test("unique-column-names", "Columns require unique names", (columns) => {
      const names = columns.map((column) => column.name.toLowerCase().trim());
      return new Set(names).size === names.length; // Ensure no duplicates
    }),
});

const AddBoardModal = () => {

  const dispatch = useDispatch();

  const {
		register,
		handleSubmit,
		control,
		formState: { errors },
  } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			name: "",
			columns: [
				{ name: "Todo", tasks: [] },
				{ name: "Doing", tasks: [] }
			],
		},
  });

  const { fields, append, remove } = useFieldArray({
		control,
		name: "columns",
  });



	const onSubmit = (data) => {
		dispatch(
			addBoard({
				updatedData: {
					name: data.name,
					columns: data.columns,
				},
			})
		);
		dispatch(addBoardModalClose());
	};


	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex-center p-4 z-[60] "
			onClick={() => dispatch(addBoardModalClose())}
		>
			<div
				className="bg-white dark:bg-secondary-black p-4 rounded-lg w-full max-w-[480px]"
				onClick={(e) => e.stopPropagation()}
			>
				<form
					className="flex flex-col gap-4"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex justify-between">
						<h1 className="large-heading dark:text-white">
							Add New Board
						</h1>
						<button
							onClick={() =>
								dispatch(
									addBoardModalClose()
								)
							}
							type="button"
							className="text-red text-xs font-bold"
						>
							Cancel
						</button>
					</div>

					{/* Board Name */}
					<div className="flex flex-col gap-1">
						<label className="font-bold dark:text-white text-xs text-tertiary-gray">
							Board Name
						</label>
						<input
							className={`body-large p-3 bg-inherit border rounded-md dark:text-white ${
								errors.name
									? "border-red placeholder:text-red"
									: "dark:border-secondary-gray"
							}`}
							type="text"
							{...register("name")}
							placeholder={ errors.name ? 'Board Name required' : 'e.g. Web Design'}
						/>
						{errors.name && <p className="text-xs bold text-red">{errors.name.message}</p>}
					</div>

					{/* Columns */}
					<div className="flex flex-col gap-2">
						<label className="font-bold dark:text-white text-xs text-tertiary-gray">
							Board Columns
						</label>
						{fields.map((field, index) => (

		<div key={field.id} className="flex gap-3">
			<input
				placeholder={
					errors.columns?.[index]?.name
						? errors.columns[index].name
								.message
						: `e.g. column ${index + 1}`
				}
				className={`w-full body-large p-3 bg-inherit  rounded-md dark:text-white border ${
					errors.columns?.[index]?.name
						? "dark:border-red border-red placeholder:text-red"
						: " border"
				} dark:border-secondary-gray`}
				type="text"
				{...register(`columns.${index}.name`)}
			/>
			<button
				type="button"
				className="ml-1"
				onClick={() => remove(index)}
			>
				<svg
					width="15"
					height="15"
					xmlns="http://www.w3.org/2000/svg"
					className="mr-1 hover:fill-red"
				>
					<g fill="#828FA3">
						<path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
						<path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
					</g>
				</svg>
			</button>
		</div>
  ))}

            {errors.columns
									?.root && (
									<p className="text-red text-xs">
										{
											errors
												.columns
												.root
												.message
										}
									</p>
								)}


						<button
							onClick={() =>
								append({
									name: "",
									tasks: [],
								})
							}
							type="button"
							className="dark:bg-white p-2 rounded-full text-[13px] font-bold text-primary-blue bg-primary-blue bg-opacity-10"
						>
							+ Add New Column
						</button>
					</div>

					{/* Buttons */}
					<div className="dark:bg-primary-blue flex-center p-2 rounded-full bg-primary-blue">
						<button
							className="font-bold text-white text-[13px]"
							type="submit"
						>
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddBoardModal;
