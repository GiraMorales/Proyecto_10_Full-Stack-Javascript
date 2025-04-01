import { Footer } from './src/components/Footer/Footer';
import { Header } from './src/components/Header/Header';
import { Home } from './src/pages/Home/Home';
import '/style.css';

const Main = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>
  `;

  Header();
  Footer();
};

// Esperar a que el DOM esté listo antes de ejecutar Home()
document.addEventListener('DOMContentLoaded', () => {
  Main();
  Home();
});
