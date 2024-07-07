export function changeTheme(theme: 'dark' | 'light') {
  localStorage.setItem('theme', theme)
  initTheme()
}

export function initTheme() {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }
}

export function getCurrentTheme() {
  console.log(document.documentElement.classList)
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}
