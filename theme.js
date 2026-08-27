const THEME_KEY = 'skillSwapTheme';

function getStoredTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch (error) {
        return null;
    }
}

function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
    const root = document.documentElement;
    root.dataset.theme = theme;
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
        // localStorage may be unavailable in some environments
    }
    const toggle = document.getElementById('themeToggleBtn');
    if (toggle) {
        toggle.innerText = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
        toggle.setAttribute('aria-pressed', theme === 'dark');
    }
}

function toggleTheme() {
    const activeTheme = document.documentElement.dataset.theme || getSystemTheme();
    setTheme(activeTheme === 'dark' ? 'light' : 'dark');
}

function initTheme() {
    const storedTheme = getStoredTheme();
    const theme = storedTheme || getSystemTheme();
    setTheme(theme);
}

window.addEventListener('DOMContentLoaded', initTheme);
