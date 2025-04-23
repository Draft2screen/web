// Main script file for Draft2Screen
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });
    
    // Initialize custom checkboxes
    const customCheckboxes = document.querySelectorAll('.custom-checkbox');
    customCheckboxes.forEach(checkbox => {
        const label = document.querySelector(`label[for="${checkbox.id}"]`);
        if (label) {
            label.addEventListener('click', function() {
                checkbox.checked = !checkbox.checked;
            });
        }
    });
    
    // Initialize custom switches
    const customSwitches = document.querySelectorAll('.custom-switch input');
    customSwitches.forEach(switchInput => {
        switchInput.addEventListener('change', function() {
            // Add any custom functionality here
        });
    });
    
    // Initialize custom ranges
    const customRanges = document.querySelectorAll('.custom-range');
    customRanges.forEach(range => {
        range.addEventListener('input', function() {
            // Update any related values
            const output = document.querySelector(`output[for="${range.id}"]`);
            if (output) {
                output.textContent = range.value;
            }
        });
    });
    
    // Initialize any charts or data visualizations
    initializeCharts();
});

// Tooltip functions
function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popup';
    tooltip.textContent = this.getAttribute('data-tooltip');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
}

function hideTooltip() {
    const tooltips = document.querySelectorAll('.tooltip-popup');
    tooltips.forEach(tooltip => tooltip.remove());
}

// Initialize charts function (placeholder)
function initializeCharts() {
    // Check if chart libraries are loaded
    if (typeof echarts !== 'undefined') {
        // Initialize ECharts
        const echartsElements = document.querySelectorAll('.echart');
        echartsElements.forEach(element => {
            const chart = echarts.init(element);
            // Get chart options from data attribute or predefined options
            const options = JSON.parse(element.getAttribute('data-options') || '{}');
            chart.setOption(options);
        });
    }
    
    if (typeof ApexCharts !== 'undefined') {
        // Initialize ApexCharts
        const apexElements = document.querySelectorAll('.apexchart');
        apexElements.forEach(element => {
            const options = JSON.parse(element.getAttribute('data-options') || '{}');
            const chart = new ApexCharts(element, options);
            chart.render();
        });
    }
}
