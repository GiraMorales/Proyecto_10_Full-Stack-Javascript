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
  header.innerHTML = ''; // Limpiar el contenido del header

  const nav = document.createElement('nav');
  const leftContainer = document.createElement('div');
  const rightContainer = document.createElement('div');
  const centerContainer = document.createElement('div');

  // Limpiar los contenedores antes de agregar contenido
  leftContainer.innerHTML = '';
  rightContainer.innerHTML = '';
  centerContainer.innerHTML = '';

  leftContainer.classList.add('left-container');
  rightContainer.classList.add('right-container');
  centerContainer.classList.add('center-container');

  // Obtener token y usuario
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Obtener usuario

  // Generar enlaces dinámicamente desde `routes`
  routes.forEach((route) => {
    const button = document.createElement('button'); // Cambiar a <button>
    button.textContent = route.texto;
    // Asociar la función al botón
    button.addEventListener('click', route.funcion);

    // FILTRO DE VISIBILIDAD SEGÚN USUARIO Y ROL
    if (route.texto === 'Login' && token) return; // Ocultar "Login" si el usuario está logueado
    if (route.texto === 'Eventos a los que voy' && !token) return; // Ocultar "Eventos a los que voy" si no está logueado
    if (
      (route.texto === 'Eventos y Asistentes' &&
        (!user || user.rol !== 'admin')) ||
      (route.texto === 'Crear Evento' && (!user || user.rol !== 'admin'))
    ) {
      return; // No agregar botones no autorizados
    }

    // 📍 ORGANIZACIÓN POR SECCIÓN
    if (route.texto === 'Home') {
      leftContainer.append(button);
    } else if (route.texto === 'Login' || route.texto === 'Cerrar sesión') {
      rightContainer.append(button);
    } else {
      centerContainer.append(button);
    }
  });

  // Agregar botón de "Cerrar sesión" si el usuario está autenticado
  if (token) {
    const logoutButton = document.createElement('button'); // Cambiar a <button>
    logoutButton.textContent = 'Cerrar sesión';
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header();
      Home();
    });
    rightContainer.append(logoutButton);
  }

  nav.append(leftContainer, centerContainer, rightContainer);
  header.append(nav);
};
