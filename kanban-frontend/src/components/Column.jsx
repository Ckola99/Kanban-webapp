import React from "react";
import Card from "./Card";
import PropTypes from "prop-types";

const Column = ({ name, tasks, circleColor }) => (
	<div className="flex flex-col gap-4 min-w-[280px]">
		<div className="flex gap-3">
			<div
				className="w-4 h-4 rounded-full"
				style={{ backgroundColor: circleColor }}
			></div>
			<h1 className="small-heading text-tertiary-gray uppercase tracking-[1.25px]">
				{name} ({tasks.length})
			</h1>
		</div>
		{tasks.map((task, index) => (
			<Card key={index} taskId={task.id} />
		))}
	</div>
);

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
