import { Strategy } from "passport-local";
import usuariosModels from "../models/usuarios.models.js";
import passport from "passport";

const fieldEstragia = { usernameField: 'email' }


const comprobacionUsuario = async (email, password, done) => {
    //console.log(email, password)

    try {

        const usuario = await usuariosModels.obtenerUsuarioPorEmail(email)
        console.log(usuario) // llegó

        if (!usuario) {
            return done(null, false, {mensaje: 'Usuario no encontrado.'})
        }
                                                                //    obj    , input -> password   
        const passwordCorrecto = await usuariosModels.revisarPassword(usuario, password)
        console.log(passwordCorrecto)
        
        if (!passwordCorrecto) {
            return done(null, false, { mensaje: 'No coincide el password'})
        }
        console.log(usuario)
        return done(null, usuario)
        
    } catch (error) {
       console.log('[comprobacionUsuario]', error)
    }


}

// Passport
// Strategy('<field>', callback)

const estrategiaLocal = new Strategy(fieldEstragia, comprobacionUsuario)

// ------------------------------------------------
// ------------------------------------------------

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser( async ( id, done ) => {
    const usuario = await usuariosModels.obtenerUsuarioPorId(id)
    done(null, usuario)
})



export default passport.use(estrategiaLocal)