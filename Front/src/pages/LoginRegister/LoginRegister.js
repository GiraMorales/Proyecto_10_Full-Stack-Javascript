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
  form.append(inputEmail);
  form.append(inputPass);
  form.append(button);

  form.addEventListener('submit', () =>
    submit(inputEmail.value, inputPass.value, form)
  );
};

const submit = async (email, password, form) => {
  console.log(email, password);

  const pErrorPrevio = form.querySelector('.error');
  if (pErrorPrevio) {
    pErrorPrevio.remove();
  }

  const res = await fetch('http://localhost:3001/api/v1/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (res.status === 404) {
    const pError = document.createElement('p');
    pError.classList.add('error');
    pError.textContent = 'Usuario o contraseña incorrectos';
    form.append(pError);
    return;
  }

  const pError = document.querySelector('.error');
  if (pError) {
    pError.remove();
  }

  const respuestaFinal = await res.json();
  console.log(respuestaFinal);
  localStorage.setItem('token', respuestaFinal.token);
  // localStorage.setItem('user', JSON.stringify(respuestaFinal.user));
  Home();
};
