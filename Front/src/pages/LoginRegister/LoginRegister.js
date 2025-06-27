import { apiRequest } from '../../Utils/apiRequest';
import { Header } from '../../components/Header/Header';
import { Home } from '../Home/Home';
import './LoginRegister.css';

export const LoginRegister = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('div');
  container.classList.add('login-register-container');
  main.append(container);

  const isLoginPage = !localStorage.getItem('token');

  if (isLoginPage) {
    Login(container);
  } else {
    Register(container);
  }
};

const Login = (elementoPadre) => {
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const button = document.createElement('button');
  const registerLink = document.createElement('p');

  inputPass.type = 'password';
  inputPass.setAttribute('autocomplete', 'current-password');
  inputEmail.type = 'email';
  inputEmail.setAttribute('autocomplete', 'email');
  inputEmail.placeholder = 'email';
  inputPass.placeholder = '*******';
  button.type = 'submit';
  button.textContent = 'Login';

  registerLink.classList.add('registerLink');
  registerLink.textContent = '¿No tienes cuenta? Regístrate aquí.';
  registerLink.style.cursor = 'pointer';

  registerLink.addEventListener('click', () => {
    elementoPadre.innerHTML = '';
    Register(elementoPadre);
  });

  elementoPadre.append(form);
  form.append(inputEmail, inputPass, button);
  elementoPadre.append(registerLink);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!inputEmail.value || !inputPass.value) {
      mostrarError(form, 'Todos los campos son obligatorios');
      return;
    }
    submitLogin(inputEmail.value, inputPass.value, form);
  });
};

const Register = (elementoPadre) => {
  const form = document.createElement('form');
  const inputUser = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const button = document.createElement('button');
  const loginLink = document.createElement('p');

  inputUser.type = 'text';
  inputUser.setAttribute('autocomplete', 'username');
  inputPass.type = 'password';
  inputPass.setAttribute('autocomplete', 'current-password');
  inputEmail.type = 'email';
  inputEmail.setAttribute('autocomplete', 'email');
  inputEmail.placeholder = 'email';
  inputPass.placeholder = '*******';
  inputUser.placeholder = 'Usuario';
  button.type = 'submit';
  button.textContent = 'Registrarse';

  loginLink.classList.add('registerLink');
  loginLink.textContent = '¿Ya tienes cuenta? Inicia sesión aquí.';
  loginLink.style.cursor = 'pointer';
  loginLink.addEventListener('click', () => {
    elementoPadre.innerHTML = '';
    Login(elementoPadre);
  });

  elementoPadre.append(form);
  form.append(inputUser, inputEmail, inputPass, button);
  elementoPadre.append(loginLink);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!inputUser.value || !inputEmail.value || !inputPass.value) {
      mostrarError(form, 'Todos los campos son obligatorios');
      return;
    }
    submitRegister(inputUser.value, inputEmail.value, inputPass.value, form);
  });
};

const submitLogin = async (email, password, form) => {
  console.log(email, password);

  const pErrorPrevio = form.querySelector('.error');
  if (pErrorPrevio) {
    pErrorPrevio.remove();
  }

  try {
    const res = await apiRequest('users/login', {
      method: 'POST',
      data: { email, password }
    });

    if (res.status === 404) {
      mostrarError(form, 'Usuario o contraseña incorrectos');
      return;
    }

    const respuestaFinal = await apiRequest('users/login', {
      method: 'POST',
      data: { email, password }
    });
    console.log('🔐 Login exitoso:', respuestaFinal);

    if (!respuestaFinal.token || !respuestaFinal.user) {
      mostrarError(form, 'Faltan datos en la respuesta del servidor');
      console.log('Usuario que se ha logueado:', respuestaFinal.user);

      return;
    }

    // ✅ Guardamos token y user (que debe incluir role)
    localStorage.setItem('token', respuestaFinal.token);
    localStorage.setItem('user', JSON.stringify(respuestaFinal.user));

    console.log('👤 Usuario:', respuestaFinal.user);

    form.reset();
    Home();
    Header();
  } catch (error) {
    console.error('❌ Error de red o servidor:', error.message);
  }
};

const submitRegister = async (userName, email, password, form) => {
  console.log(email, password, userName);

  const pErrorPrevio = form.querySelector('.error');
  if (pErrorPrevio) {
    pErrorPrevio.remove();
  }

  try {
    const res = await apiRequest('users/register', {
      method: 'POST',
      data: { userName, email, password }
    });

    const respuestaFinal = await apiRequest('users/login', {
      method: 'POST',
      data: { email, password }
    });
    console.log('Respuesta del servidor:', respuestaFinal);

    if (res.status === 400) {
      const errorMensaje =
        respuestaFinal.message || 'Usuario ya existe, prueba con otro.';
      mostrarError(form, errorMensaje);
      return;
    }

    if (!res.ok || !respuestaFinal.token) {
      mostrarError(form, 'Error al registrar el usuario');
      return;
    }

    // ✅ Guardar token tras registro exitoso
    localStorage.setItem('token', respuestaFinal.token);
    localStorage.setItem('user', JSON.stringify(respuestaFinal.user || {}));

    form.reset();
    setTimeout(() => {
      Home();
      Header();
    }, 200);
  } catch (error) {
    console.error('Error al registrar:', error);
    mostrarError(form, 'No se pudo conectar al servidor');
  }
};

const mostrarError = (form, mensaje) => {
  const pErrorPrevio = form.querySelector('.error');
  if (pErrorPrevio) pErrorPrevio.remove();

  const pError = document.createElement('p');
  pError.classList.add('error');
  pError.textContent = mensaje;
  form.append(pError);
};
