"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { MdOutlineDarkMode, MdOutlineWbSunny, MdDesktopWindows } from "react-icons/md";

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="w-9 h-9 p-2 opacity-0" aria-label="Loading theme..." />
        );
    }

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    return (
        <button
            onClick={cycleTheme}
            className="p-2 rounded-md transition hover:bg-white/10 text-muted-foreground hover:text-foreground"
            title={`Current theme: ${theme}`}
        >
            {theme === "light" && <MdOutlineWbSunny size={20} />}
            {theme === "dark" && <MdOutlineDarkMode size={20} />}
            {theme === "system" && <MdDesktopWindows size={20} />}
        </button>
    );
};

export default ThemeToggle;
