import React, {createContext, ReactChild, ReactNode, useMemo, useState} from 'react';

export type ThemeContextType = {
    isDark: boolean;
    setIsDark: (theme: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ isDark: false, setIsDark: ()=> console.log('no theme provider')});

interface ThemeContextProviderProps{
    children: ReactChild | ReactNode
}

const ThemeContextProvider = ({children}:ThemeContextProviderProps) => {
    const [isDark, setIsDark] = useState<boolean>(false)

    const value = useMemo<ThemeContextType>(() => ({isDark, setIsDark}), [isDark]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
