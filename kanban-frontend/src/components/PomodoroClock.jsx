import React from 'react';
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PropTypes from "prop-types";
import useDarkMode from "../hooks/useDarkMode";


const PomodoroClock = ({ progress, timerValue }) => {

	const [isDarkMode, toggleDarkMode] = useDarkMode();
	const textColor = isDarkMode ? "#fff" : "#635FC7";

	// Format time from seconds to MM:SS
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
	};

	return (

		<div className = "w-[300px] h-[300px] mb-5" >
			<CircularProgressbar
				value={progress}
				text={formatTime(timerValue)}
				styles={buildStyles({
					textColor: textColor,
					pathColor: "#635FC7",
					trailColor: "#4A4A4A",
				})}
			/>
		</div >
  	)
}


PomodoroClock.propTypes = {
	progress: PropTypes.number.isRequired,
	timerValue: PropTypes.number.isRequired
}

export default PomodoroClock;
