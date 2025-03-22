import { EventosAsistire } from '../../pages/EventosAsistire/EventosAsistire';
import { Home } from '../../pages/Home/Home';
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister';
import './Header.css';

const routes = [
  { texto: 'Home', funcion: Home },
  { texto: 'Login', funcion: LoginRegister }
];

export const Header = () => {
  const header = document.querySelector('header');
  header.innerHTML = '';

  const nav = document.createElement('nav');
  const leftContainer = document.createElement('div');
  const rightContainer = document.createElement('div');
  const centerContainer = document.createElement('div');

  leftContainer.classList.add('left-container');
  rightContainer.classList.add('right-container');
  centerContainer.classList.add('center-container');

  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', Home);
  leftContainer.append(homeLink);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // ✅ Parseamos el usuario

  if (token) {
    const eventosLink = document.createElement('a');
    eventosLink.href = '#';
    eventosLink.textContent = 'Eventos a los que voy';
    eventosLink.addEventListener('click', EventosAsistire);
    centerContainer.append(eventosLink);

    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Cerrar sesión';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('eventosAsistire');
      Header();
      Home();
    });
    rightContainer.append(logoutLink);
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.textContent = 'Login';
    loginLink.addEventListener('click', LoginRegister);
    rightContainer.append(loginLink);
  }

  nav.append(leftContainer, centerContainer, rightContainer);
  header.append(nav);
};
