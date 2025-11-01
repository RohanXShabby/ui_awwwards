"use client";

import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineWbSunny } from "react-icons/md";

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-md transition bg-background/40 border border-card-border/40 pointer-events-auto "
        >
            {theme === "light" ? <MdOutlineDarkMode size={20} /> : <MdOutlineWbSunny size={20} />}
        </button>
    );
};

export default ThemeToggle;
