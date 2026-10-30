// Light is the default. The visitor's choice is remembered in localStorage
// (the browser's small built-in storage) so it carries across pages.
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

var savedTheme = 'light';
try {
  savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
} catch (e) {
  // Storage can be blocked; fall back to the light default.
}
applyTheme(savedTheme);

document.addEventListener('DOMContentLoaded', function () {
  var button = document.getElementById('theme-toggle');

  function updateButton() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    button.textContent = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  }

  button.addEventListener('click', function () {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {
      // Ignore: the theme still changes for this page.
    }
    updateButton();
  });

  updateButton();
});
