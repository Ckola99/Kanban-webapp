import logoLightMobile from "../assets/logo-mobile.svg";
import dropdown from "../assets/icon-chevron-down.svg";
import addTask from "../assets/icon-add-task-mobile.svg";
import hamburger from "../assets/icon-vertical-ellipsis.svg";

const Header = () => {
	return (
		<div className="h-16 w-full dark:bg-secondary-black flex px-4 justify-between bg-white fixed left-0 right-0 top-0">
			{/* left side */}
			<div className="flex-center">
				<img src={logoLightMobile} alt="logo" />
				<div className="flex-center ml-3">
					<h3 className="dark:text-white text-[18px] font-bold mr-2">
						Platform Launch
					</h3>

					<img
						src={dropdown}
						alt="drop down arrow"
					/>

				</div>
			</div>

			{/* right side */}
			<div className="flex items-center">
				<button className="bg-primary-blue bg-opacity-25 w-12 h-8 flex-center rounded-2xl mr-4">
					<img src={addTask} alt="" />
				</button>
				<button>
					<img src={hamburger} alt="hamburger button" />
				</button>
			</div>
		</div>
	);
};

export default Header;
