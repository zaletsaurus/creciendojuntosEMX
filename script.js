const createAccountBtn = document.getElementById('create-account-btn');
const createAccountModal = document.getElementById('create-account-modal');
const closeCreateAccountBtn = document.getElementById('close-create-account');
const createAccountForm = document.getElementById('create-account-form');
const createAccountError = document.getElementById('create-account-error');

const signinBtn = document.getElementById('signin-btn');
const signinModal = document.getElementById('signin-modal');
const closeSigninBtn = document.getElementById('close-signin');
const signinForm = document.getElementById('signin-form');
const signinError = document.getElementById('signin-error');


let existingUsers = [];


if (localStorage.getItem('users')) {
  existingUsers = JSON.parse(localStorage.getItem('users'));
}


createAccountBtn.addEventListener('click', () => {
  createAccountModal.style.display = 'block';
});


closeCreateAccountBtn.addEventListener('click', () => {
  createAccountModal.style.display = 'none';
  createAccountForm.reset(); 
  createAccountError.style.display = 'none'; 
});


signinBtn.addEventListener('click', () => {
  signinModal.style.display = 'block';
});


closeSigninBtn.addEventListener('click', () => {
  signinModal.style.display = 'none';
  signinForm.reset(); 
  signinError.style.display = 'none'; 
});


createAccountForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  
  if (existingUsers.some(user => user.username === username)) {
    createAccountError.textContent = "Nombre de usuario existente";
    createAccountError.style.display = "block";
  } else {
    
    existingUsers.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    
    alert("Cuenta creada exitosamente");
    createAccountModal.style.display = "none";
    createAccountForm.reset(); 
    createAccountError.style.display = "none"; 

    const expirationDate = new Date(Date.now() + 31536000000); 
    document.cookie = `email=${email}; expires=${expirationDate.toUTCString()}; path=/`;
  }
});

signinForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  const user = existingUsers.find(user => user.email === email && user.password === password);
  if (user) {

    const expirationDate = new Date(Date.now() + 31536000000); 
    document.cookie = `email=${email}; expires=${expirationDate.toUTCString()}; path=/`;

    
    localStorage.setItem('username', user.username);
    alert("Inicio de sesión exitoso");

    
    window.location.replace("ventas.html");
  } else {
    signinError.textContent = "Datos incorrectos";
    signinError.style.display = "block";
  }
});

const cookies = document.cookie.split(';');
let email = null;

for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();
  if (cookie.startsWith('email=')) {
    email = cookie.substring('email='.length);
    break;
  }
}

if (email) {
  
  document.getElementById('signin-email').value = email;
}