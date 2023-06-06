import useDarkMode from "../hooks/useDarkMode";

// Icons
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md";

const DarkModeSwitch = () => {
    const [theme, setTheme] = useDarkMode();

    const handleChange = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
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
