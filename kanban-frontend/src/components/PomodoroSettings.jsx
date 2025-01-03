import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateSettings, selectPomodoroState } from "../features/pomodoro/pomodoroSlice";


const Input = ({ label, register, type, errors }) => {
	const hasError = !!errors[label];

	return (
		<div className="w-[280px] h-[55px] flex flex-col justify-between md:w-full gap-2">

				<label
					htmlFor={label}
					className={`font-bold dark:text-white text-[12px] ${hasError ? "text-red" : ""}`}
				>
					{label}
				</label>


			<input
				className={`w-full h-[45px] border-2 ${hasError ? "border-red caret-red" : "dark:border-white"
					} rounded-lg pl-2 text-[14px] font-bold focus:outline-none bg-inherit dark:caret-white dark:text-white`}
				id={label}
				type={type}
				{...register(label)}
			/>
		</div>
	);
};

const schema = yup.object().shape({
	"Work Duration (min):" : yup
		.number()
		.required("Work duration is required")
		.min(1, "Must be at least 1 minute")
		.max(120, "Must be less than 120 minutes"),
	"Short Break (min):" : yup
		.number()
		.required("Short break duration is required")
		.min(1, "Must be at least 1 minute")
		.max(30, "Must be less than 30 minutes"),
	"Long Break (min):" : yup
		.number()
		.required("Long break duration is required")
		.min(1, "Must be at least 1 minute")
		.max(60, "Must be less than 60 minutes")
});

const PomodoroSettings = ({ close }) => {
	const dispatch = useDispatch();
	const settings = useSelector(selectPomodoroState);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			"Work Duration (min):" : settings.pomodoroSettings.workDuration,
			"Short Break (min):" : settings.pomodoroSettings.shortBreakDuration,
			"Long Break (min):" : settings.pomodoroSettings.longBreakDuration
		}
	});

	const onSubmit = (data) => {

		const workDuration = data["Work Duration (min):"];
		const shortBreakDuration = data["Short Break (min):"];
		const longBreakDuration = data["Long Break (min):"];

		dispatch(updateSettings({
			workDuration,
			shortBreakDuration,
			longBreakDuration
		}));
		close(); // Close the settings modal after updating
	};

	return (
		<div className="p-5 bg-white dark:bg-secondary-black rounded-lg">
			<button onClick={() => close()} className="absolute top-3 left-3">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 hover:stroke-red dark:text-white ">
										<path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
									</svg>
			</button>
			<h2 className="text-lg font-bold mb-4 dark:text-white">Pomodoro Settings</h2>
			<form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-3">
				<Input
					label="Work Duration (min):"
					register={register}
					type="number"
					errors={errors}
				/>
				<Input
					label="Short Break (min):"
					register={register}
					type="number"
					errors={errors}
				/>
				<Input
					label="Long Break (min):"
					register={register}
					type="number"
					errors={errors}
				/>
				<button
					type="submit"
					className="w-full h-10 bg-main-orange text-white font-bold rounded mt-4 bg-primary-blue hover:bg-opacity-50"
				>
					Save Settings
				</button>
			</form>
		</div>
	);
};

export default PomodoroSettings;
