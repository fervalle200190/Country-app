import { createContext, FC, useState } from "react";

interface ThemeContext {
    theme: string,
    changeTheme: (c: string)=> void
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

const initialState = "light"

export const ThemeProvider: FC = ({ children }) => {
    const [theme, setTheme] = useState(initialState)
    const changeTheme = (c: string)=> {
        if(c === "light") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }
  return (
    <ThemeContext.Provider value={{theme,changeTheme}}>
        { children }
    </ThemeContext.Provider>
  )
}