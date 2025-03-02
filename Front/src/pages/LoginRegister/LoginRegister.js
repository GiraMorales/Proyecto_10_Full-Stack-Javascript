import { Header } from '../../components/Header/Header';
import { Home } from '../Home/Home';
import './LoginRegister.css';

export const LoginRegister = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const loginDiv = document.createElement('div');
  Login(loginDiv);
  loginDiv.id = 'login';
  main.append(loginDiv);
};

const Login = (elementoPadre) => {
  const form = document.createElement('form');

  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const button = document.createElement('button');

  inputPass.type = 'password';
  inputPass.setAttribute('autocomplete', 'current-password');
  inputEmail.type = 'email';
  inputEmail.setAttribute('autocomplete', 'email');
  inputEmail.placeholder = 'email';
  inputPass.placeholder = '*******';
  button.textContent = 'Login';

  elementoPadre.append(form);
  form.append(inputEmail, inputPass, button);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submit(inputEmail.value, inputPass.value, form);
  });
};

const submit = async (email, password, form) => {
  console.log(email, password);

  const pErrorPrevio = form.querySelector('.error');
  if (pErrorPrevio) {
    pErrorPrevio.remove();
  }

  try {
    const res = await fetch('http://localhost:3000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (res.status === 404) {
      mostrarError(form, 'Usuario o contraseña incorrectos');
      return;
    }

    if (res.status !== 200) {
      mostrarError(form, 'Error al conectar con el servidor');
      return;
    }

    const respuestaFinal = await res.json();
    console.log(respuestaFinal);

    localStorage.setItem('token', respuestaFinal.token);
    localStorage.setItem('user', JSON.stringify(respuestaFinal.user));

    Home();
    Header();
  } catch (error) {
    console.error('Error de red o servidor:', error);
    mostrarError(form, 'No se pudo conectar al servidor');
  }
};

const mostrarError = (form, mensaje) => {
  const pErrorPrevio = form.querySelector('.error');
  if (pErrorPrevio) {
    pErrorPrevio.remove();
  }

  const pError = document.createElement('p');
  pError.classList.add('error');
  pError.textContent = mensaje;
  form.append(pError);
};
