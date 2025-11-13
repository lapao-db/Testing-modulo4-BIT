import { TestBed } from "@angular/core/testing";
import { LoginService } from "./login.service";
// configurar el client HTTP
import { provideHttpClient } from "@angular/common/http";
//herramientas para SIMULAR las solicitudes HTTP
import { provideHttpClientTesting, HttpTestingController } from "@angular/common/http/testing";

// Definir el grupo de pruebas
describe("Pruebas de servicio de Login", ()=>{

// definir nuestro mock -> informacion simulada relacionada con peticiones a una API
// configuracion inicial del entorno de pruebas -> Obligatoria hacerla 
let httpMock : HttpTestingController;  // se le asigna tipo de variable
let service : LoginService;

const credentialsMock = {
    email: 'pepita@gmail.com',
    password: '123'
}

const tokenMock = 'ejnrvernvenvslnsldnvlrnv'

beforeEach(()=>{
    //la configuracion inicial del entorno de pruebas
    TestBed.configureTestingModule({
        providers: [
            LoginService,
            provideHttpClient(),
            provideHttpClientTesting()
        ]
    })

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LoginService);
})

// Definir los casos de prueba

// Caso 1: Simular la petición POST para Iniciar sesion
it('Simular peticion POST para iniciar sesion',()=>{
    const apiUrl = 'http://localhost:9000/iniciarSesion'
    const responseMock = {"mensaje":"Inicio sesion Exitoso"}

    service.login(credentialsMock.email,credentialsMock.password).subscribe(
        (res) => {
            expect(res).toEqual(responseMock);
        }
    )

    // Simulacion de petición a un Back
    const req = httpMock.expectOne(apiUrl) // esta simulacion se espera que sea igual a la url dada
    expect(req.request.method).toBe("POST")

    req.flush(responseMock)

})

// Caso 2. Obtener Token
it('Caso 2. Obtener token', ()=>{
    localStorage.setItem('token', tokenMock); // lo guardamos primero en local para despues validar si lo trae.
    expect(service.getToken()).toBe(tokenMock)  // REtorna el mismo token que se guarda en localStorage

})

// Caso 3. Verificar su esta Loggeado o no -> true/false
it('Caso 3: Verificar si está loggeado o no', ()=>{
    localStorage.setItem('token', tokenMock);
    expect(service.isLoggedIn()).toBeTrue(); // me debe retornar verdadero
})

// Caso 4 . Verificar cierre de sesion
it('Caso 4: Verificar si se cierra sesion', ()=>{
    localStorage.setItem('token', tokenMock);
    service.logout(); // Primero cierro sesion
    expect(localStorage.getItem('token')).toBeNull();
})

});