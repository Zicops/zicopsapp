export function checkUser(user) {
  const userData = sessionStorage.getItem('loggedUser');
  if (!userData) {
    window.location.pathname = '/login';
    return setToastMsg({ type: 'danger', message: 'Please Login!!' });
  }
}
