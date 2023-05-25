localStorage.removeItem('token');

async function initApp() {
  const root = document.getElementById('root');

  const loginContainer = document.createElement('div');
  const usernameInput = document.createElement('input');
  usernameInput.setAttribute('type', 'input');
  usernameInput.setAttribute('placeholder', 'usuario');
  usernameInput.value = 'sergio';
  usernameInput.addEventListener('click', () => '');
  loginContainer.appendChild(usernameInput);

  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'input');
  passwordInput.setAttribute('placeholder', 'password');
  passwordInput.value = 'password';
  passwordInput.addEventListener('click', () => '');
  loginContainer.appendChild(passwordInput);

  const registerButton = document.createElement('input');
  registerButton.setAttribute('type', 'submit');
  registerButton.setAttribute('value', 'Registarse');
  registerButton.addEventListener('click', () => '');
  loginContainer.appendChild(registerButton);

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

    const allUsersContainer = document.createElement('div');
    allUsersContainer.setAttribute('class', 'allUsersContainer');

    users.forEach(async (user) => {
      const userInfoUsername = document.createElement('p');
      userInfoUsername.setAttribute('class', 'userInfo');
      userInfoUsername.textContent = user.username;
      allUsersContainer.appendChild(userInfoUsername);

      const userInfoPassword = document.createElement('p');
      userInfoPassword.setAttribute('class', 'userInfo');
      userInfoPassword.textContent = user.password;
      allUsersContainer.appendChild(userInfoPassword);

      const userInfoBoss = document.createElement('p');
      userInfoBoss.setAttribute('class', 'userInfo');
      const response = await fetch('http://localhost:3000/users/id/645be4422cb25f2b6620ef3f', {
        headers: { 'Content-Type': 'application/json', Authorization: localStorage.token },
        method: 'GET',
      });
      users = await response.json();
      console.log(users);
      // userInfoBoss.textContent = user.boss;
      userInfoBoss.textContent = users.username;
      allUsersContainer.appendChild(userInfoBoss);

      const userInfoEdit = document.createElement('img');
      userInfoEdit.setAttribute('class', 'iconImg');
      userInfoEdit.src = 'edit.png';
      allUsersContainer.appendChild(userInfoEdit);

      const userInfoDelete = document.createElement('img');
      userInfoDelete.setAttribute('class', 'iconImg');
      userInfoDelete.src = 'delete.png';
      allUsersContainer.appendChild(userInfoDelete);
    });

    root.removeChild(loginContainer);
    root.appendChild(allUsersContainer);
  }

  const allUsersButtonContainer = document.createElement('div');
  const allUsersButton = document.createElement('input');
  allUsersButton.setAttribute('type', 'submit');
  allUsersButton.setAttribute('value', 'Acceder a usuarios');
  allUsersButton.style.visibility = 'hidden';
  allUsersButton.addEventListener('click', getAllUsers);

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
    allUsersButton.style.visibility = 'visible';
    loginContainer.appendChild(userToken);
  }

  const loginButton = document.createElement('input');
  loginButton.setAttribute('type', 'submit');
  loginButton.setAttribute('value', 'Login');
  loginButton.addEventListener('click', userLogin);
  allUsersButtonContainer.appendChild(loginButton);
  allUsersButtonContainer.appendChild(allUsersButton);
  loginContainer.appendChild(allUsersButtonContainer);
  root.appendChild(loginContainer);
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
