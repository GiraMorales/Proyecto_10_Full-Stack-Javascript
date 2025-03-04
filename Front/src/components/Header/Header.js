import { Home } from '../../pages/Home/Home';
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister';
import './Header.css';

const routes = [
  {
    texto: 'Home',
    funcion: Home
  },
  {
    texto: 'Login',
    funcion: LoginRegister
  }
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

  // Enlace Home
  const homeLink = document.createElement('a');
  homeLink.href = '#';
  homeLink.textContent = 'Home';
  homeLink.addEventListener('click', (e) => {
    Home();
  });

  leftContainer.append(homeLink);

  const a = document.createElement('a');
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token) {
    a.textContent = 'Cerrar sesión';
    a.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header();
    });
    rightContainer.append(a);

    if (user && user.userName) {
      const spanUser = document.createElement('span');
      spanUser.textContent = `Hola, ${user.userName}. Aquí tienes tus eventos`;
      centerContainer.append(spanUser);
    }
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = '#';
    loginLink.textContent = 'Login';
    loginLink.addEventListener('click', LoginRegister);
    rightContainer.append(loginLink);
  }
  // Añadir los contenedores al nav y el nav al header
  nav.append(leftContainer, centerContainer, rightContainer);
  header.append(nav);
};
