//clases y arrays

class Socio {
    constructor(id, nombre, categoria, cuotaValor, ultimoAnioPago){
        this.id = id,
        this.nombre = nombre,
        this.categoria = categoria,
        this.cuotaValor = cuotaValor
        this.ultimoAnioPago = ultimoAnioPago
    }
}
//Padron de socios actual.
const socio1 = new Socio(1,"Mariano Sanchez","Socio Activo", 3000, 2023)
const socio2 = new Socio(2,"Magali Sanchez","Socio Infantil", 2000, 2023)
const socio3 = new Socio(3,"Marcela Roberto","Socio Activo", 3000, 2022)
const socio4 = new Socio(4,"Florencia Sanchez","Socio Activo", 3000, 2023)
const socio5 = new Socio(5,"Luciano Rondo","Socio Cadete", 2500, 2022)
const socio6 = new Socio(6,"Alberto Roberto","Socio Activo", 3000, 2023)
const socio7 = new Socio(7,"Ruben Sanchez","Socio Activo", 3000, 2023)
const socio8 = new Socio(8,"Ariel Fajardo","Socio Activo", 3000, 2022)

const socios = []

socios.push(socio1, socio2, socio3, socio4, socio5, socio6, socio7, socio8)

class pago {
    constructor(cuponPago, id, categoria, cantidadCuotas, totalPago, actualizaAnioPago){
        this.cuponPago = cuponPago,
        this.id = id,
        this.categoria = categoria,
        this.cantidadCuotas = cantidadCuotas
        this.totalPago = totalPago
        this.actualizaAnioPago = actualizaAnioPago
    }
}
//const nuevoPago = new pago(

const pagos = []

//storage
//stringify para setear objetos/arraysDeObjetos y parse para captar objetos/arraysDeObjetos
localStorage.setItem("padron", JSON.stringify(socios))
let padron = localStorage.getItem("padron")


//funciones
let botonAsociarse = document.getElementById("botonAsociarse")
let inputSocioAlta = document.getElementById("nombreYapellido")
let inputEdadAlta = document.getElementById("edad")
let inputAbonosAlta = document.getElementById("abonos")
let sociosDiv = document.getElementById("sociosDiv")
let sociosIngreso = document.getElementById("sociosIngreso")
let botonPadron = document.getElementById("botonesPadron")
let searchSocio = document.getElementById("buscarSocio")
let searchSocioNumero = document.getElementById("buscarSocioNumero")


function ingresarNuevoSocio(tomaArray){
    let nombreNuevoSocio = inputSocioAlta.value
    let edadSocio = parseInt(inputEdadAlta.value)
    let cantidadAbonos = parseInt(inputAbonosAlta.value)
    ultimoAnioPago = 2022 + cantidadAbonos
    const nuevoSocio = new Socio(tomaArray.length+1, nombreNuevoSocio, detectarCategoriaCorrecta(edadSocio), cuotaPorCategoria(edadSocio), ultimoAnioPago)
    tomaArray.push(nuevoSocio)
    alert(`    Usted ha completa el registro correctamente!
    Bienvenido socio N°${tomaArray.length}, ${nombreNuevoSocio}.`)
    inputSocioAlta.value = ""
    inputEdadAlta.value = ""
    inputAbonosAlta.value = ""
}

function checkIngreso(func, array){
    if(inputSocioAlta.value != "" && inputEdadAlta.value != "" && inputAbonosAlta.value != "")
    {
        func(array)
    }
    else{
        alert("Por favor complete todos los campos correctamente!")}
}
function consultarPadronSocios(tomaArray){
    sociosDiv.innerHTML = ""
    for(let asociado of tomaArray){
        let verSocio = document.createElement("tr")
        verSocio.innerHTML =`

        <th scope="row">${asociado.id}</th>
        <td>${asociado.nombre}</td>
        <td>${asociado.categoria}</td>
        <td>$${asociado.cuotaValor}</td>
        <td>${asociado.ultimoAnioPago}</td>
        `
        sociosDiv.append(verSocio)
    }
}

function noEncontrado(){
    sociosDiv.innerHTML = ""
    let verSocio = document.createElement("tr")
    verSocio.innerHTML =`
        <th scope="row">Error</th>
        <td>Datos no encontrados</td>`
    sociosDiv.append(verSocio)
}

function detectarCategoriaCorrecta(rangoEdad){
    if (rangoEdad == ""){
        return "Ingresar informacion correcta"
    }
    else if (rangoEdad < 12 ){
        return "Socio Infantil"
    }
    else if (rangoEdad >= 12 && rangoEdad < 18){
        return "Socio Cadete"
    }
    else if(rangoEdad >= 18){
        return "Socio Activo"
        }
}
function cuotaPorCategoria(rangoEdad){
    if (rangoEdad < 12 ){
        return 2000
    }
    else if (rangoEdad >= 12 && rangoEdad < 18){
        return 2500
    }
    else if(rangoEdad >= 18){
        return 3000
}
}

function buscarCategoriaSocios(tomaArray, parametro){
    let socioBuscado = parametro
    let socioEncontrado = tomaArray.find(
        (buscado) => buscado.id == socioBuscado
    )
    if(socioEncontrado == undefined)
        {if(socioBuscado != null)
        {console.log(`${socioBuscado} no se encuentra en nuestro padron, por favor volver a consultar correctamente.`)}
        else{}}
    else{
        return socioEncontrado
    }
}

function buscarNumeroSocio (){
    let numeroSocio = prompt("Por favor ingrese su numero de socio")
    while (buscarCategoriaSocios(socios, numeroSocio) == undefined && numeroSocio != null)
    {numeroSocio = prompt(`Ingrese su numero de socio correctamente`)}
    return numeroSocio}

function buscarSocioPorNumero(parametro){
    let socioBusqueda = parseInt(parametro)
    let buscar = socios.filter(
        (socio) => socio.id == socioBusqueda )
    if(parametro ==""){
    }
    else if(buscar.length === 0)
        {noEncontrado()}
        else{
        consultarPadronSocios(buscar)
        }
    }
    
function buscarSocioPorNombre(parametro){
    let socioBusqueda = parametro.toLowerCase()
    let buscar = socios.filter(
        (socio) => socio.nombre.toLowerCase().includes(socioBusqueda))
    if(buscar.length === socios.length){ 
    }
    else if(buscar.length == 0)
        {noEncontrado()}
        else{
        consultarPadronSocios(buscar)
        }
}

//DOM


botonPadron.onclick = () => {
    consultarPadronSocios(socios)
}
searchSocio.oninput = () => {
    buscarSocioPorNombre(searchSocio.value)
}
searchSocioNumero.oninput = () => {
    buscarSocioPorNumero(searchSocioNumero.value)
}
botonAsociarse.onclick = () => {
    checkIngreso(ingresarNuevoSocio,socios)
    sociosSiNoBoton.classList.toggle(`classSociosSiNo`)
    serSocio()
    consultarPadronSocios(socios)
}