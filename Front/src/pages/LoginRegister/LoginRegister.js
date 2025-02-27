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
  inputEmail.placeholder = 'email';
  inputPass.placeholder = '*******';
  button.textContent = 'Login';

  elementoPadre.append(form);
  form.append(inputEmail);
  form.append(inputPass);
  form.append(button);
};
