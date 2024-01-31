import React, {useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeSwitcher = ({darkMode, setDarkMode}) => {

    useEffect(() => {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        setDarkMode(isDarkMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <div
            onClick={toggleDarkMode}
            className="cursor-pointer"
        >
            {darkMode ? <FaSun color='#3c3e6e' /> : <FaMoon color='#3c3e6e' />}
        </div>
    );
};

export default ThemeSwitcher;
