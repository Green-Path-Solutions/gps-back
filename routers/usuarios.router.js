import express from 'express'
const routerUsuarios = express.Router()
import usuariosController from '../controllers/usuarios.controller.js'

// ! Muestra el formulario de registro 
// http://localhost:8080/api/auth/register
routerUsuarios.get('/api/auth/register', usuariosController.showAuthFormRegister);

// ! Recibe los datos completados en el formulario de registro
// http://localhost:8080/api/auth/register
routerUsuarios.post('/api/auth/register', usuariosController.register);

// ! Muestra el formulario de logueo 
// http://localhost:8080/api/auth/login
routerUsuarios.get('/api/auth/login', usuariosController.showAuthFormLogin);

// ! Recibe los datos completados en el formulario para el logueo
// http://localhost:8080/api/auth/login
routerUsuarios.post('/api/auth/login', usuariosController.login);

// ! Deslogueo de usuarios
// http://localhost:8080/api/auth/logout
routerUsuarios.get('/api/auth/logout', usuariosController.logout);

export default routerUsuarios;