import React, { useState, } from 'react';
import { useTheme } from 'context/themeContext';
interface HeaderProps {
    title: string,
}

export const Header = ({ title }: HeaderProps) => {
    const [theme, setTheme] = useState<String>('light')
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const { color, setColor, setColorBlue } = useTheme()


    return (
        <div className="header-content">
            <h2 style={{ color }}>{title}</h2>
            <button onClick={() => setTheme(nextTheme)}>
                Change theme to {nextTheme}
            </button>
            <button onClick={setColorBlue}>
                Change color to blue
            </button>
            <button onClick={() => setColor('green')}>
                Change color to green
            </button>
        </div>
    );
}
