export function checkUser() {
  if (window.location.pathname === '/login') return;
  const userData = sessionStorage.getItem('loggedUser');
  if (!userData) {
    window.location.pathname = '/login';
    return;
  }
}
