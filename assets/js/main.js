document.addEventListener("DOMContentLoaded",function(){
    new SweetScroll({});

    // Initialize theme toggle
    initThemeToggle();

    // Initialize 2026 redesign features
    initSiteNav();
    initTagFilter();
    
    particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 280,
      "density": {
        "enable": true,
        "value_area": 1250
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 3,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 190,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 30,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

}); // End of DOMContentLoaded event

// Dark Mode Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-toggle-icon');
    
    if (!themeToggle || !themeIcon) {
        console.log('Theme toggle elements not found');
        return;
    }
    
    console.log('Theme toggle initialized');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Saved theme:', savedTheme);
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update icon based on current theme
    updateThemeIcon(savedTheme);
    
    // Remove any existing event listeners to prevent duplicates
    const newThemeToggle = themeToggle.cloneNode(true);
    themeToggle.parentNode.replaceChild(newThemeToggle, themeToggle);
    
    // Add click event listener with preventDefault
    newThemeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Toggle clicked');
        
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        console.log('Current theme:', currentTheme);
        console.log('New theme:', newTheme);
        
        // Update theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
        
        console.log('Theme switched to:', newTheme);
        console.log('Icon should now be:', newTheme === 'dark' ? '☀️' : '🌙');
    });
    
    function updateThemeIcon(theme) {
        const newIcon = theme === 'dark' ? '☀️' : '🌙';
        const iconElement = document.querySelector('.theme-toggle-icon');
        if (iconElement) {
            iconElement.textContent = newIcon;
            console.log('Icon updated to:', newIcon);
        } else {
            console.log('Icon element not found');
        }
    }
}

/* ------------------------------------------------------------------
 * Site navigation: mobile hamburger + splash-page scroll transition
 * ------------------------------------------------------------------ */
function initSiteNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const toggle = document.getElementById('site-nav-toggle');
    const menu = document.getElementById('site-nav-menu');

    // Hamburger toggle (mobile)
    if (toggle && menu) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close menu when a link is clicked (mobile)
        menu.querySelectorAll('.site-nav__link').forEach(function(link) {
            link.addEventListener('click', function() {
                menu.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll transition (splash page only)
    if (nav.classList.contains('site-nav--splash')) {
        const threshold = 80;
        const onScroll = function() {
            if (window.scrollY > threshold) {
                nav.classList.add('is-scrolled');
            } else {
                nav.classList.remove('is-scrolled');
            }
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }
}

/* ------------------------------------------------------------------
 * Blog index: tag filter (client-side show/hide)
 * ------------------------------------------------------------------ */
function initTagFilter() {
    const chips = document.querySelectorAll('.tag-chip');
    if (chips.length === 0) return;

    const hero = document.querySelector('.blog-hero');
    const cards = document.querySelectorAll('.post-card');
    const emptyState = document.getElementById('blog-index-empty');

    function applyFilter(tag) {
        let visibleCount = 0;

        // Hero visibility
        if (hero) {
            const heroTags = (hero.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
            const matchHero = tag === 'all' || heroTags.indexOf(tag) !== -1;
            hero.style.display = matchHero ? '' : 'none';
            if (matchHero) visibleCount++;
        }

        // Card visibility
        cards.forEach(function(card) {
            const cardTags = (card.getAttribute('data-tags') || '').split(/\s+/).filter(Boolean);
            const match = tag === 'all' || cardTags.indexOf(tag) !== -1;
            card.style.display = match ? '' : 'none';
            if (match) visibleCount++;
        });

        if (emptyState) {
            emptyState.hidden = visibleCount > 0;
        }
    }

    chips.forEach(function(chip) {
        chip.addEventListener('click', function() {
            chips.forEach(function(c) {
                c.classList.remove('is-active');
                c.setAttribute('aria-selected', 'false');
            });
            chip.classList.add('is-active');
            chip.setAttribute('aria-selected', 'true');
            applyFilter(chip.getAttribute('data-tag'));
        });
    });
}