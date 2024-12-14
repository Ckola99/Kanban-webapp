import React from "react";
import PropTypes from "prop-types";

const Subtasks = ({ card, handleSubtaskToggle }) => {

	return (
		<div className="flex flex-col gap-2">
			{card.subtasks.map((sub) => (
				<div
					key={sub.id}
					className={` ${
						sub.isCompleted
							? "  bg-secondary-blue"
							: " bg-secondary-light-gray "
					} p-2 rounded  dark:bg-primary-black dark:bg-opacity-50 dark:hover:bg-secondary-blue hover:bg-secondary-blue`}
				>
					<label
						className={` ${
							sub.isCompleted
								? "line-through dark:text-primary-gray text-secondary-gray"
								: "dark:text-white"
						} font-bold text-xs flex items-center gap-3 `}
					>
						<input
							className="dark:bg-primary-blue checked:primary-blue dark:checked:bg-primary-blue "
							type="checkbox"
							name="subtasks"
							value={sub.title}
							checked={
								sub.isCompleted
							}
							onChange={() => {
									handleSubtaskToggle(
										sub.id,
										!sub.isCompleted
									)
								}
							}
						/>{" "}
						{sub.title}
					</label>
				</div>
			))}
		</div>
	);
};

Subtasks.propTypes = {
	card: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		status: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		subtasks: PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				isCompleted: PropTypes.bool.isRequired,
			}).isRequired
		).isRequired,
	}).isRequired,
	handleSubtaskToggle: PropTypes.func.isRequired,
};

export default Subtasks;
