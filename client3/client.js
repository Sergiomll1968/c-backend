localStorage.removeItem('token');

async function initApp() {
  const root = document.getElementById('root');

  const usernameInput = document.createElement('input');
  usernameInput.setAttribute('type', 'input');
  usernameInput.setAttribute('placeholder', 'usuario');
  usernameInput.value = 'sergio';
  usernameInput.addEventListener('click', () => '');
  root.appendChild(usernameInput);

  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'input');
  passwordInput.setAttribute('placeholder', 'password');
  passwordInput.value = 'password';
  passwordInput.addEventListener('click', () => '');
  root.appendChild(passwordInput);

  const registerButton = document.createElement('input');
  registerButton.setAttribute('type', 'submit');
  registerButton.setAttribute('value', 'Registarse');
  registerButton.addEventListener('click', () => '');
  root.appendChild(registerButton);

  async function userLogin() {
    const username = usernameInput.value;
    const password = passwordInput.value;
    const response = await fetch('http://localhost:3000/login', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    const token = await response.json();
    localStorage.token = token;
    const userToken = document.createElement('p');
    userToken.innerText = token;
    root.appendChild(userToken);
  }

  const loginButton = document.createElement('input');
  loginButton.setAttribute('type', 'submit');
  loginButton.setAttribute('value', 'Login');
  loginButton.addEventListener('click', userLogin);
  root.appendChild(loginButton);

  async function getAllUsers() {
    let users = [];

    try {
      const response = await fetch('http://localhost:3000/users/all', {
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.token },
        method: 'GET',
      });
      users = await response.json();
    } catch {
      console.log('error');
      return;
    }

    users.forEach((user) => {
      const userInfo = document.createElement('p');
      userInfo.textContent = JSON.stringify(user);
      root.appendChild(userInfo);
    });
  }

  const allUsersButton = document.createElement('input');
  allUsersButton.setAttribute('type', 'submit');
  allUsersButton.setAttribute('value', 'Obtener usuarios');
  allUsersButton.addEventListener('click', getAllUsers);
  root.appendChild(allUsersButton);
}

initApp();

/* <h2>Login Form</h2>

<div class="container">

  <form action="/action_page.php" method="post">
    <div class="imgcontainer">
      <img src="imagen.png" alt="Avatar" class="imgavatar">
    </div>

    <div class="datacontainer">
      <label for="uname"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="uname" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw" required>

      <button type="submit">Login</button>
      <label>
        <input type="checkbox" checked="checked" name="remember"> Remember me
      </label>
    </div>

    <div class="datacontainer">
      <button type="button" class="cancelbtn">Cancel</button>
      <span class="psw">Forgot <a href="#">password?</a></span>
    </div>
  </form>

</div> */
