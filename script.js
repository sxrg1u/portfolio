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

document.addEventListener("DOMContentLoaded", loadTheme);