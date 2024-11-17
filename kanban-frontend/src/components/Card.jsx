import React, { useState } from "react";
import PropTypes from "prop-types";
import CardDetailsModal from "./CardDetailsModal";

const Card = ({ task }) => {
	const [isModalOpen, setModalOpen] = useState(false);

	return (
		<>
			<div
				className="bg-white dark:bg-secondary-black dark:text-white w-[280px] h-auto rounded-lg p-4 shadow-md"
				onClick={() => setModalOpen(true)}
			>
				<h2 className="med-heading mb-2">
					{task.title}
				</h2>
				<p className="text-tertiary-gray body-med">
					{
						task.subtasks.filter(
							(sub) => sub.isCompleted
						).length
					}{" "}
					of {task.subtasks.length} subtasks
				</p>
			</div>
			{isModalOpen && (
				<CardDetailsModal
					card={task}
					onClose={() => setModalOpen(false)}
				/>
			)}
		</>
	);
};

Card.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		status: PropTypes.string.isRequired,
		subtasks: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				isCompleted: PropTypes.bool.isRequired,
			}).isRequired
		).isRequired,
	}).isRequired,
};

export default Card;
