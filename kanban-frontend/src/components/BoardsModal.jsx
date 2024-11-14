import React from "react";
import { useSelector } from "react-redux";
import DarkModeToggle from "./DarkModeToggle";
import boardIcon from "../assets/icon-board.svg";

const BoardsModal = () => {
	const boards = useSelector((state) => state.boards);

	return (
		<div className="fixed inset-0 flex justify-center bg-[#000000] bg-opacity-50 transition-colors z-12 ">
			<div className="w-[264px] h-80 bg-white rounded-xl mt-[82px] py-4 flex flex-col dark:bg-primary-gray dark:shadow-xl dark:shadow-primary-blue/5">
				<h1 className="font-bold text-xs uppercase text-tertiary-gray tracking-[2.4px] ml-5 mb-4">
					all boards ({boards?.boards.length})
				</h1>
				<ul className="flex flex-col mb-4">
					{boards &&
						boards.boards.map(
							(board, index) => (
								<button
									key={
										index
									}
									className={` w-[240px] h-12 flex items-center pl-5 text-tertiary-gray`}
								>
									<img
										src={
											boardIcon
										}
										alt=""
									/>
									<p
										className={`ml-3 med-heading `}
									>
										{
											board.name
										}
									</p>
								</button>
							)
						)}
					<button
						className={` w-[240px] h-12 flex items-center pl-5 text-tertiary-gray`}
					>
						<svg
							width="16"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-primary-blue"
						>
							<path
								d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
							/>
						</svg>
						<p className="ml-3 med-heading text-primary-blue">
							+ Create New Board
						</p>
					</button>
				</ul>
				<DarkModeToggle/>
			</div>
		</div>
	);
};

export default BoardsModal;
