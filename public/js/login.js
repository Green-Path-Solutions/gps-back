// ---- gg
// document.getElementById('login-google-init').addEventListener('click', function() {
//     window.location.href = 'https://google.com';
//   });


// ! ------------------------------ Logearse

// const username = document.getElementById('user');
// const password = document.getElementById('pass');
// const messageLoginEmailValidator = document.getElementById('message-login-email-validator')
// const buttonAccess = document.getElementById('button-access');

// const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



// buttonAccess.addEventListener('click', async(e) => {
//     e.preventDefault()

//     if (!regex.test(username.value)) {
//         messageLoginEmailValidator.style.display = 'block';
//         return;
//     } else {
//         messageLoginEmailValidator.style.display = 'none';
//     }

//     const data = {
//         email: username.value,
//         password: password.value
//     }

//     try {
//         const response = await fetch(('/api/auth/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//             credentials: 'include' // Esto permite que las cookies de sesión sean enviadas
//         }));

//         const result = await response.json();

//         if (response.ok) {
//             console.log('Login successful:', result);
//             // Guardar el token en el almacenamiento local o redirigir al usuario
//             localStorage.setItem('token', result.token);
//             window.location.href = '/dashboard'; // Cambia esto por la ruta que desees
//         } else {
//             console.error('Login error:', result.message);
//             alert(result.message); // Mostrar mensaje de error
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });


// ! ------------------------------ Registrarse

// const registerButton = document.querySelector('.btn-inicio a.enviar-register');
// const registerForm = document.querySelector('.form-box-register');

// registerButton.addEventListener('click', async (e) => {
//     e.preventDefault();

//     const name = registerForm.querySelector('input[placeholder="NOMBRE"]').value;
//     const surname = registerForm.querySelector('input[placeholder="APELLIDO"]').value;
//     const email = registerForm.querySelector('input[placeholder="CORREO ELECTRÓNICO"]').value;
//     const password = registerForm.querySelector('input[placeholder="CONTRASEÑA"]').value;
//     const confirmPassword = registerForm.querySelector('input[placeholder="CONFIRMAR CONTRASEÑA"]').value;

//     if (password !== confirmPassword) {
//         alert('Las contraseñas no coinciden');
//         return;
//     }

//     const data = {
//         username: `${name} ${surname}`,
//         email,
//         password
//     };

//     try {
//         const response = await fetch('/api/auth/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//             credentials: 'include'
//         });

//         const result = await response.json();

//         if (response.ok) {
//             console.log('Registration successful:', result);
//             alert('Registro exitoso, por favor inicia sesión');
//             // Opcionalmente redirigir al login
//             contenedor.classList.remove('active'); // Mostrar el formulario de login
//         } else {
//             console.error('Registration error:', result.message);
//             alert(result.message); // Mostrar mensaje de error
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// });