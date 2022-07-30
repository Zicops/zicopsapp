export function checkUser() {
  if (window.location.pathname === '/login') return;
  const userData = JSON.parse(sessionStorage.getItem('loggedUser'));
  if (!userData) {
    window.location.pathname = '/login';
    return;
  }
}
