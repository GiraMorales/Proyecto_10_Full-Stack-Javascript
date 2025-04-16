import { CrearEvento } from '../../pages/CrearEvento/CrearEvento';
import { EventosAsistentes } from '../../pages/EventosAsistentes/EventosAsistentes';
import { EventosAsistire } from '../../pages/EventosAsistire/EventosAsistire';
import { Home } from '../../pages/Home/Home';
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister';
import './Header.css';

const routes = [
  { texto: 'Home', funcion: Home },
  { texto: 'Login', funcion: LoginRegister },
  { texto: 'Eventos a los que voy', funcion: EventosAsistire },
  { texto: 'Eventos y Asistentes', funcion: EventosAsistentes },
  { texto: 'Crear Evento', funcion: CrearEvento }
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

  // Generar enlaces dinámicamente desde `routes`
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Obtener usuario

  routes.forEach((route) => {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = route.texto;
    link.addEventListener('click', route.funcion);

    // FILTRO DE VISIBILIDAD SEGÚN USUARIO Y ROL
    if (route.texto === 'Login' && token) return;
    if (route.texto === 'Eventos a los que voy' && !token) return;
    if (
      route.texto === 'Eventos y Asistentes' &&
      (!user || user.role !== 'admin')
    )
      return;
    if (route.texto === 'Crear Evento' && (!user || user.role !== 'admin'))
      return;

    // 📍 ORGANIZACIÓN POR SECCIÓN
    if (route.texto === 'Home') {
      leftContainer.append(link);
    } else if (route.texto === 'Login' || route.texto === 'Cerrar sesión') {
      rightContainer.append(link);
    } else {
      centerContainer.append(link);
    }
  });

  // Agregar enlace de "Cerrar sesión" si el usuario está autenticado
  if (token) {
    const logoutLink = document.createElement('a');
    logoutLink.href = '#';
    logoutLink.textContent = 'Cerrar sesión';
    logoutLink.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header();
      Home();
    });
    rightContainer.append(logoutLink);
  }

  nav.append(leftContainer, centerContainer, rightContainer);
  header.append(nav);
};
