import React, { useState } from 'react';

interface HeaderProps {
    title: string,
}

export const Header = ({ title }: HeaderProps) => {
    const [theme, setTheme] = useState<String>('light')
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    return (
        <div className="header-content">
            <h2>{title}</h2>
            <button onClick={() => setTheme(nextTheme)}>
                Change theme to {nextTheme}
            </button>
        </div>
    );
}
