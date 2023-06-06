import { useEffect, useState } from "react";

const useDarkMode = () => {
    const [theme, setTheme] = useState("system");

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme");
        if (localTheme) {
            setTheme(localTheme);
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        window.localStorage.setItem("theme", theme);
    }, [theme]);

    return [theme, setTheme];
};

export default useDarkMode;
