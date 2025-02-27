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
  const nav = document.createElement('nav');
  for (const route of routes) {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = route.texto;
    a.addEventListener('click', route.funcion);
    nav.append(a);
  }
  header.append(nav);
};
