function isLightMode() {
    return document.documentElement.classList.contains("light-mode");
}

function updateThemeIcons(isLight) {
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

function toggleTheme() {
    document.documentElement.classList.toggle("light-mode");
    const isLight = isLightMode();
    try {
        localStorage.setItem("theme", isLight ? "light" : "dark");
    } catch (e) {}
    updateThemeIcons(isLight);
}

function loadTheme() {
    let saved = null;
    try {
        saved = localStorage.getItem("theme");
    } catch (e) {}
    if (saved === "light") document.documentElement.classList.add("light-mode");
    updateThemeIcons(isLightMode());
}

// HAMBURGER MENU
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

// KOPIEREN-KNÖPFE (Kontaktseite)
function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).catch(() => copyTextFallback(text));
    }
    return copyTextFallback(text);
}

// Fallback, z.B. wenn die Seite direkt als Datei geöffnet ist
function copyTextFallback(text) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    return Promise.resolve();
}

function initCopyButtons() {
    document.querySelectorAll("[data-copy]").forEach((btn) => {
        const label = btn.textContent;
        btn.addEventListener("click", () => {
            copyText(btn.dataset.copy).then(() => {
                btn.textContent = btn.dataset.done;
                setTimeout(() => (btn.textContent = label), 1500);
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    initHamburger();
    initCopyButtons();
});
