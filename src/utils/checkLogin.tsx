export default function checkLogin() {
  return localStorage.getItem('goalAdminLoginStatus') === 'login';
}
