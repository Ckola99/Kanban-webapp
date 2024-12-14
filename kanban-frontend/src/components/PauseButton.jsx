import { pauseTimer } from "../features/pomodoro/pomodoroSlice";
import { useDispatch } from "react-redux";


const PauseButton = () => {
	const dispatch = useDispatch()

	return (
		<button
			className={`p-2  dark:text-white text-primary-black rounded-full flex gap-1 dark:bg-gray-700 bg-secondary-light-gray `}
			onClick={() => dispatch(pauseTimer())}
		>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="w-6 h-6"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M15.75 5.25v13.5m-7.5-13.5v13.5"
				/>
			</svg>
			Pause Timer
		</button>
	)
}

export default PauseButton;
