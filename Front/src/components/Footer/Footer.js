import './Footer.css';

export const Footer = () => {
  const footer = document.querySelector('footer');
  footer.innerHTML = `<h3>By Gira Morales Revelles</h3>`;
  const h3 = footer.querySelector('h3');
  h3.classList.add('titulo-footer'); // Añadir clase para estilos
};
