/**
 * Language Switcher Script
 * Saves user's manual language selection to localStorage
 */
(function() {
    // Function to save user's language preference
    function saveLanguagePreference() {
        var currentPath = window.location.pathname;
        var language = 'en'; // default

        // Detect current language from URL
        if (currentPath.indexOf('/zh-cn/') === 0) {
            language = 'zh-cn';
        } else if (currentPath.indexOf('/en/') === 0) {
            language = 'en';
        }

        // Save to localStorage
        localStorage.setItem('language', language);
    }

    // Save language preference when page loads
    document.addEventListener('DOMContentLoaded', function() {
        saveLanguagePreference();
    });

    // Listen for language switcher clicks
    document.addEventListener('click', function(event) {
        var target = event.target;

        // Check if clicked element is a language switcher
        if (target.closest('.td-language-switcher') || 
            target.closest('[data-language-switcher]') ||
            target.href && (target.href.includes('/en/') || target.href.includes('/zh-cn/'))) {

            // Extract language from href
            var href = target.href;
            if (href) {
                var language = 'en';
                if (href.includes('/zh-cn/')) {
                    language = 'zh-cn';
                } else if (href.includes('/en/')) {
                    language = 'en';
                }

                // Save user's manual choice
                localStorage.setItem('language', language);
            }
        }
    });
})();