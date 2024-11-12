import logoLightMobile from "../assets/logo-mobile.svg";
import dropdown from "../assets/icon-chevron-down.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";

const Header = () => {
	return (
		<div className=" w-full dark:bg-primary-gray bg-white font-plus-jakarta grid grid-cols-[70%_30%] place-content-center h-16 p-4">
			<div className="grid grid-cols-[10%_90%] place-content-center">
				<img src={logoLightMobile} alt="" />
				<h3 className="large-heading text-black dark:text-white grid grid-cols-[65%_35%] pl-4 place-items-center">
					Platform Launch
					<img src={dropdown} alt="" className="-ml-[82px]"/>
				</h3>
			</div>
			<div className="grid grid-cols-[80%_20%]">
				<button className="w-12 h-8 bg-secondary-blue bg-opacity-25 rounded-2xl place-self-end align-items-center place-items-center">
					<img
						src={addTask}
						alt=""
						className=""
					/>
				</button>
				<button className=" grid content-center">
					<img src={hamburger} alt="" className="justify-self-end" />
				</button>
			</div>
		</div>
	);
};

export default Header;
