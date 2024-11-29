import passport from 'passport'
import models from '../models/usuarios.models.js'

const showAuthFormRegister = (req, res) => {
    res.render('usuarios/register')
}

// La info que del formulario
const register = async (req, res) => {
    
    const usuario = req.body
    //console.log(usuario)

    const { name, apellido, email, password, confirm_password } = usuario
    const errores = []

    try {
        // Verifica que los campos no sean undefined
        if (!name || !apellido || !email || !password || !confirm_password) {
            errores.push({ mensaje: 'Todos los campos son obligatorios' });
        }


        if ( password !== confirm_password ) {
            errores.push( { mensaje: 'La contraseña no coincide' } )
        }

        if ( password && password.length < 5 ) {
            errores.push( { mensaje: 'La contraseña debe tener al menos 5 caracteres'} )
        }

        const usuarioEncontrado = await models.obtenerUsuarioPorEmail( email )

        if ( usuarioEncontrado ) {
            errores.push( { mensaje: 'El usuario ya existe'} )
        }

        if ( errores.length > 0 ) {
            return res.status(400).json(errores) // status -> 400 ->  bad requets
        }
        
        // Creo el usuario
        const usuarioCreado = await models.crearUsuario(usuario)
        console.log(usuarioCreado)

        // const objRespuesta = {
        //     name: usuarioCreado.name,
        //     email: usuarioCreado.email,
        //     id: usuarioCreado._id
        // }

        // res.json(objRespuesta)

        res.redirect('/api/auth/login?registered=true');

    } catch (error) {
        console.log('[register]', error)
        res.status(500).json({mensaje: 'No se pudo registrar el usuario'})
    }
}
const showAuthFormLogin = (req, res) => {
    const registered = req.query.registered === 'true';
    res.render('usuarios/login', { registered })
}

// const login = passport.authenticate('local', {
//     successRedirect: 'http://localhost:5173/index.html',
//     failureRedirect: '/api/auth/login'
// })

const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.redirect('/api/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            // Almacena el nombre del usuario en la sesión
            req.session.userName = user.name;
            return res.redirect('http://localhost:5173/index.html');
        });
    })(req, res, next);
};


const logout = (req, res) => {
    req.logout();
    res.redirect('http://localhost:5173/index.html'); // Ruta que deseada después del logout
};



export default {
    showAuthFormRegister,
    register,
    showAuthFormLogin,
    login,
    logout
}