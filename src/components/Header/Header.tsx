import React, { useState, useContext } from 'react';
import ThemeContext from 'context/ThemeContext';
interface HeaderProps {
    title: string,
}

export const Header = ({ title }: HeaderProps) => {
    const [theme, setTheme] = useState<String>('light')
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    const color = useContext(ThemeContext)

    return (
        <div className="header-content">
            <h2 style={{color}}>{title}</h2>
            <button onClick={() => setTheme(nextTheme)}>
                Change theme to {nextTheme}
            </button>
        </div>
    );
}
