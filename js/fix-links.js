// Function to update all navigation links across the site
document.addEventListener('DOMContentLoaded', function() {
    // Fix all navigation links
    const navLinks = document.querySelectorAll('nav a, .sidebar a, header a');
    navLinks.forEach(link => {
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Skip if it's already a proper link or external link
        if (!href || href.startsWith('http') || href.startsWith('#')) {
            return;
        }
        
        // Make sure the link has the correct extension
        if (!href.endsWith('.html')) {
            link.setAttribute('href', href + '.html');
        }
    });
    
    // Add theme toggle button if not present
    if (!document.getElementById('theme-toggle')) {
        const headerRight = document.querySelector('header .flex:last-child');
        if (headerRight) {
            const themeToggle = document.createElement('button');
            themeToggle.id = 'theme-toggle';
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = '<i class="ri-sun-line ml-2"></i> الوضع الفاتح';
            themeToggle.addEventListener('click', function() {
                const currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
                setTheme(currentTheme);
                localStorage.setItem('theme', currentTheme);
            });
            
            headerRight.prepend(themeToggle);
        }
    }
    
    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    setTheme(currentTheme);
});

function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
    updateToggleButtonText(theme);
}

function updateToggleButtonText(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        if (theme === 'light') {
            themeToggle.innerHTML = '<i class="ri-moon-line ml-2"></i> الوضع الداكن';
        } else {
            themeToggle.innerHTML = '<i class="ri-sun-line ml-2"></i> الوضع الفاتح';
        }
    }
}
