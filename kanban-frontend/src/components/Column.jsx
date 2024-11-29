import React, { useState } from "react";
import Card from "./Card";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ name, tasks, circleColor }) => {

	const {setNodeRef} = useDroppable({
		id: name
	})

	return (
		<div
			className="flex flex-col min-w-[280px] gap-4"
			ref={setNodeRef}
		>
			<div className="flex gap-3 mb-2">
				<div
					className="w-4 h-4 rounded-full"
					style={{ backgroundColor: circleColor }}
				></div>
				<h1 className="small-heading text-tertiary-gray uppercase tracking-[1.25px]">
					{name} ({tasks.length})
				</h1>
			</div>

			{tasks.map((task) => (
				<Card taskId={task.id} key={task.id}/>
			))}
		</div>
	);
};

Column.propTypes = {
	name: PropTypes.string.isRequired,
	tasks: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.string,
			status: PropTypes.string.isRequired,
			subtasks: PropTypes.arrayOf(
				PropTypes.shape({
					title: PropTypes.string.isRequired,
					isCompleted: PropTypes.bool.isRequired,
				}).isRequired
			).isRequired,
		})
	).isRequired,
	circleColor: PropTypes.string.isRequired,
};

export default Column;
