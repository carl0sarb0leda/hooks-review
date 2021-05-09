import React, { ReactNode, useState } from 'react';

// type State = string
// type Dispatch = () => void
type ThemeProviderProps = { children: ReactNode }

const ThemeContext = React.createContext<any>(undefined);

// Custom Provider component
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [color, setColor] = useState<string>()
    const value = React.useMemo(() => [color, setColor], [color])
    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
// Custom hook consumer 
const useTheme = () => {
    const context = React.useContext(ThemeContext)
    if (!context) {
        throw new Error(`useTheme must be used with a ThemeProvider`)
    }
    const [color, setColor] = context
    const setColorBlue = () => setColor('blue')
    return { color, setColor, setColorBlue }
}
export { ThemeProvider, ThemeContext, useTheme };