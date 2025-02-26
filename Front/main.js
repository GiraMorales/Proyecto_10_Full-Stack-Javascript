import { Footer } from './src/components/Footer/Footer';
import { Header } from './src/components/Header/Header';
import { Home } from './src/pages/Home/Home';
import { LoginRegister } from './src/pages/LoginRegister/LoginRegister';
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
Home();
LoginRegister();
