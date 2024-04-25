import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../themes/theme';

export const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
    const [savedTheme, setSavedTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', savedTheme);
    }, [savedTheme]);

    const changeThemeOnClick = () => {
        const newTheme = savedTheme === 'light' ? 'dark' : 'light';
        setSavedTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ changeThemeOnClick }}>
            <ThemeProvider theme={savedTheme === 'dark' ? darkTheme : lightTheme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

CustomThemeProvider.propTypes = {
    children: PropTypes.node.isRequired
  };