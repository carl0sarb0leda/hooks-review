import React, { ReactNode, useState } from 'react';

// Defining types
type State = string | undefined
type SetState = React.Dispatch<React.SetStateAction<State>>
type ThemeContextProps = { color: State, setColor: SetState } | undefined
type ThemeProviderProps = { children: ReactNode }

const ThemeContext = React.createContext<ThemeContextProps>(undefined);

// Custom Provider component
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [color, setColor] = useState<string>()
    const value = React.useMemo(() => { return { color, setColor } }, [color])
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
    const { color, setColor } = context
    const setColorBlue = () => setColor('blue')
    return { color, setColor, setColorBlue }
}
export { ThemeProvider, ThemeContext, useTheme };