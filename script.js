function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");

    const icon = document.getElementById("theme-icon");
    if (icon) {
        const src = icon.getAttribute("src");
        const base = src.substring(0, src.lastIndexOf("/"));
        icon.setAttribute("src", isLight ? base + "/sunlightmode.png" : base + "/sun.png");
    }

    const homeIcon = document.getElementById("home-icon");
    if (homeIcon) {
        const src = homeIcon.getAttribute("src");
        const base = src.substring(0, src.lastIndexOf("/"));
        homeIcon.setAttribute("src", isLight ? base + "/homelightmode.png" : base + "/home.png");
    }
}

function loadTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
        document.body.classList.add("light-mode");

        const icon = document.getElementById("theme-icon");
        if (icon) {
            const src = icon.getAttribute("src");
            const base = src.substring(0, src.lastIndexOf("/"));
            icon.setAttribute("src", base + "/sunlightmode.png");
        }

        const homeIcon = document.getElementById("home-icon");
        if (homeIcon) {
            const src = homeIcon.getAttribute("src");
            const base = src.substring(0, src.lastIndexOf("/"));
            homeIcon.setAttribute("src", base + "/homelightmode.png");
        }
    }
}

// ── HAMBURGER MENU ──────────────────────────────────────────────
function initHamburger() {
    const hamburger = document.getElementById("hamburger-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeBtn   = document.getElementById("mobile-menu-close");

    if (!hamburger || !mobileMenu) return;

    function openMenu() {
        mobileMenu.classList.add("open");
        hamburger.classList.add("open");
        hamburger.setAttribute("aria-expanded", "true");
        document.body.style.overflow = "hidden"; // kein scroll hinter Menu
    }

    function closeMenu() {
        mobileMenu.classList.remove("open");
        hamburger.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () => {
        if (mobileMenu.classList.contains("open")) closeMenu();
        else openMenu();
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    // Klick ausserhalb schliesst Menu
    mobileMenu.addEventListener("click", (e) => {
        if (e.target === mobileMenu) closeMenu();
    });

    // ESC schliesst Menu
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    initHamburger();
});
