import { startTimer } from "../features/pomodoro/pomodoroSlice";
import { useSelector, useDispatch } from "react-redux";

const PlayButton = () => {
	const dispatch = useDispatch();

	return (
		<button
				className="p-2 dark:bg-gray-700 dark:text-white bg-secondary-light-gray rounded-full flex gap-1"
				onClick={() => dispatch(startTimer())}
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
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				/>
			</svg>
			Start Timer
		</button>
	)
}

export default PlayButton;
