import mongoose from "mongoose";
import usuariosEsquema from "./schemas/usuarios.schemas.js";

const UsuarioModelo = mongoose.model('usuarios', usuariosEsquema)

const crearUsuario = async (usuario) => {

    try {

        const usuarioCreado = new UsuarioModelo(usuario)  // password: '123456'

        // Antes de guardar el documento a través del modelo voy a encriptar el password
        usuarioCreado.password = await usuarioCreado.encriptarPassword(usuario.password)

        // password: 'klfduasidfuoi123h1p23y41po34i80980980'
        await usuarioCreado.save()
        return usuarioCreado

        
    } catch (error) {
        throw error
    }
}

const obtenerUsuarioPorEmail = async ( email ) => {

    try {

        const usuarioEncontrado = await UsuarioModelo.findOne( { email: email } )
        return usuarioEncontrado
        
    } catch (error) {
        throw error
    }

}

//                               DB   ,  input
const revisarPassword = async (usuario, password) => {

    try {
        const isMatch = await usuario.comprobarPassword(password)
        console.log(isMatch)
        return isMatch
    } catch (error) {
        console.log('[revisarPassword]', error)
    }

}

const obtenerUsuarioPorId = async (id) => {

    try {

        const usuario = await UsuarioModelo.findById(id)
        return usuario
        
    } catch (error) {
        console.log('[obtenerUsuarioPorId', error)
    }

}


export default {
    crearUsuario,
    obtenerUsuarioPorEmail,
    revisarPassword,
    obtenerUsuarioPorId
}