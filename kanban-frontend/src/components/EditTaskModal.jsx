import React from 'react';
import { useForm } from "react-hook-form";

const EditTaskModal = () => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data) => {
		console.log('data', data)
	}

  return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex-center p-4 z-[60]">
			<div className="bg-white dark:bg-secondary-black p-4">
				<form className="" onSubmit={handleSubmit(onSubmit)}>
					<h1>Edit Task</h1>
					label
				</form>
			</div>
		</div>
  );
}

export default EditTaskModal
