import { Footer } from './src/components/Footer/Footer';
import { Header } from './src/components/Header/Header';
import '/style.css';

const Main = () => {
  const app = document.getElementById('app');
  app.innerHTML = `
  <header></header>
  <main></main>
  <footer></footer>`;
};

Main();
Header();
Footer();
