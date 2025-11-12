// 1. importaciones necesarias para probar
import { loginUser } from "../src/controllers/user.controller.js";
import supertest from "supertest"; //nos permite probar peticiones
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";
import bcrypt from "bcryptjs";
import app from "../app.js";


// 2. Desarrollo

describe('Prieba funcion login...',()=>{
    
    // Configuracion global
    const testUser = {
        fullName: 'Pepita',
        email: 'pepita@gmail.com',
        password: '123'
    }
    
    //antes de cada caso de prueba
    beforeEach(async ()=>{
        await userModel.deleteMany({}); // Borra todo lo de la Base de Datos
    });

    //despues de todos los casos de prueba -> SIEMPRE cerrar conexión a la BD
    afterAll(async ()=>{
        await mongoose.connection.close();
    });

    // ----- Casos de Prueba
    // 1-Caso exitoso de inicio de sesión
    
    it('Deberia iniciar sesion correctamente con credenciales válidas', async ()=>{
        const codedPassword = await bcrypt.hash(testUser.password,10); //encriptar la contraseña
        await userModel.create({...testUser, password:codedPassword}); // Guardar el usuario de prueba
        // opc-2 para guardar en BD -> await new userModel({...testUser, password:codedPassword}).save;

        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: testUser.email,
            passwordLogin: testUser.password
        });
        expect (response.statusCode).toBe(200)
    });

    
    // 2-Caso de error: por usuario no registrado

     it('NO Deberia iniciar sesion correctamente correo invalido', async ()=>{
        const codedPassword = await bcrypt.hash(testUser.password,10); //encriptar la contraseña
        await userModel.create({...testUser, password:codedPassword}); // Guardar el usuario de prueba
        // opc-2 para guardar en BD -> await new userModel({...testUser, password:codedPassword}).save;
        
        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: 'carlitos@gmail.com',
            passwordLogin: testUser.password
        });
        expect (response.statusCode).toBe(404);
    });

    //3-Caso error: por usuario con contraseña incorrecta
     it('NO Deberia iniciar sesion correctamente, contraseña incorrecta', async ()=>{
        const codedPassword = await bcrypt.hash(testUser.password,10); //encriptar la contraseña
        await userModel.create({...testUser, password:codedPassword}); // Guardar el usuario de prueba
        // opc-2 para guardar en BD -> await new userModel({...testUser, password:codedPassword}).save;
        
        const response = await supertest(app).post('/iniciarSesion').send({
            emailLogin: testUser.email,
            passwordLogin: '321'
        });
        expect (response.statusCode).toBe(401);
    });

})