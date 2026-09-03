const KEY = "vk_theme";

export function getTheme() {
  return localStorage.getItem(KEY) || "dark"; // dark is the default
}

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function initTheme() {
  applyTheme(getTheme());
}

export function setTheme(theme) {
  localStorage.setItem(KEY, theme);
  applyTheme(theme);
}
