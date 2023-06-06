import React from "react";
import Switch from "react-switch";
import { css } from "@emotion/core";
import useDarkMode from "./useDarkMode";

const DarkModeSwitch = () => {
    const [theme, setTheme] = useDarkMode();

    const handleChange = (checked, event, value) => {
        setTheme(value);
    };

    return (
        <div css={switchStyle}>
            <Switch
                onChange={handleChange}
                checked={theme === "dark"}
                uncheckedIcon={false}
                checkedIcon={false}
                offColor="#FBBF24"
                onColor="#10B981"
                value={theme === "dark" ? "light" : "dark"}
            />
        </div>
    );
};

const switchStyle = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0.5rem;
`;

export default DarkModeSwitch;
