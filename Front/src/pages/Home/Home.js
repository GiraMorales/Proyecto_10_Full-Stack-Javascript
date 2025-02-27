import './Home.css';

export const Home = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const homeDiv = document.createElement('div');
  homeDiv.id = 'home';
  main.append(homeDiv);
};
