import useDarkMode from "../hooks/useDarkMode";

// Icons
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

const DarkModeSwitch = ({ blockType }) => {
    const [theme, setTheme] = useDarkMode();

    const handleChange = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return blockType ? (
        <button
            onClick={handleChange}
            className="w-full gap-2 items-center flex flex-row text-lg"
        >
            {theme === "dark" ? (
                <MdOutlineDarkMode className="text-text" size="1.5rem" />
            ) : (
                <MdOutlineWbSunny className="text-textLight" size="1.5rem" />
            )}
            Cambiar aspecto
        </button>
    ) : (
        <button onClick={handleChange}>
            {theme === "dark" ? (
                <MdOutlineDarkMode className="text-fuchsia-600" size="1.8rem" />
            ) : (
                <MdOutlineWbSunny className="text-fuchsia-600" size="1.8rem" />
            )}
        </button>
    );
};

export default DarkModeSwitch;
