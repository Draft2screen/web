// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Add event listener to theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
            setTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
});

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        updateThemeToggleText('light');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        updateThemeToggleText('dark');
    }
}

function updateThemeToggleText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (themeToggle) {
        if (theme === 'light') {
            themeToggle.innerHTML = '<i class="ri-moon-line ml-2"></i> الوضع الداكن';
        } else {
            themeToggle.innerHTML = '<i class="ri-sun-line ml-2"></i> الوضع الفاتح';
        }
    }
    
    if (mobileThemeToggle) {
        if (theme === 'light') {
            mobileThemeToggle.innerHTML = '<i class="ri-moon-line ml-2"></i> الوضع الداكن';
        } else {
            mobileThemeToggle.innerHTML = '<i class="ri-sun-line ml-2"></i> الوضع الفاتح';
        }
    }
}
