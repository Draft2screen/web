// Header functionality for Draft2Screen
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('hidden');
            // Animate the menu sliding in
            setTimeout(() => {
                const menuPanel = mobileMenu.querySelector('.transform');
                if (menuPanel) {
                    menuPanel.classList.remove('translate-x-full');
                }
            }, 10);
        });
    }
    
    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            const menuPanel = mobileMenu.querySelector('.transform');
            if (menuPanel) {
                menuPanel.classList.add('translate-x-full');
                // Hide the overlay after animation completes
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
        
        // Also close when clicking the overlay
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                const menuPanel = mobileMenu.querySelector('.transform');
                if (menuPanel) {
                    menuPanel.classList.add('translate-x-full');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                }
            }
        });
    }
    
    // Search toggle functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function() {
            searchBar.classList.toggle('hidden');
            if (!searchBar.classList.contains('hidden')) {
                searchBar.querySelector('input').focus();
            }
        });
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    function toggleTheme() {
        const currentTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
        setTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Set initial theme based on localStorage or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Highlight active page in navigation
    highlightActivePage();
    
    // Add dropdown functionality for user menu
    setupDropdowns();
});

// Set theme function
function setTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
    updateThemeToggleText(theme);
}

// Update theme toggle button text
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

// Highlight active page in navigation
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Handle case when at root (index.html or empty)
    const isHomePage = !currentPage || currentPage === '' || currentPage === 'index.html';
    
    // Select all navigation links
    const navLinks = document.querySelectorAll('header nav a, #mobile-menu nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Remove any existing active classes
        link.classList.remove('bg-primary', 'text-white');
        
        // Check if this link matches current page
        if ((isHomePage && href === 'index.html') || 
            (!isHomePage && href && href.includes(currentPage))) {
            // Add active styling
            link.classList.add('bg-primary', 'text-white');
            link.classList.remove('text-gray-300', 'hover:bg-dark-accent');
        }
    });
}

// Setup dropdown functionality
function setupDropdowns() {
    // For non-hover devices (touch screens)
    const dropdownButtons = document.querySelectorAll('.group > button');
    
    dropdownButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Only handle click on touch devices
            if (window.matchMedia('(hover: none)').matches) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                
                // Toggle visibility
                if (dropdown.classList.contains('invisible')) {
                    dropdown.classList.remove('invisible', 'opacity-0');
                    dropdown.classList.add('visible', 'opacity-100');
                } else {
                    dropdown.classList.add('invisible', 'opacity-0');
                    dropdown.classList.remove('visible', 'opacity-100');
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.group > .absolute');
        
        dropdowns.forEach(dropdown => {
            // Check if click is outside the dropdown and its toggle button
            const button = dropdown.previousElementSibling;
            if (!dropdown.contains(e.target) && !button.contains(e.target)) {
                dropdown.classList.add('invisible', 'opacity-0');
                dropdown.classList.remove('visible', 'opacity-100');
            }
        });
    });
}
