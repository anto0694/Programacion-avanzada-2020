var juegoIniciado = false;
var juegoTerminado = false;
var turno = 0;
var cantMovimientos = 0;
var jugador1;
var jugador2;
var fichaJ1;
var fichaJ2;
var empate = 0;
var ganadosJugador1 = 0;
var ganadosJugador2 = 0;
var ganador = false;
var tablero = new Array(8);


function iniciarJuego() {
    //inicializar las celdas 
    inicializarCeldas();
    seleccionarFichas();

    if (juegoIniciado == false && validar() == true) {
        juegoIniciado = true;

    } else {
        reiniciarJuego();
    }
    cambiarTurno();
}

function validar() {
    jugador1 = document.getElementById("jugador1").value;
    jugador2 = document.getElementById("jugador2").value;

    if (jugador1 == "" && jugador2 == "") {
        alert("Falta el nombre de los jugadores");
        return false;
    } else if (jugador1 == "") {
        alert("Falta el nombre del jugador 1");
        return false;
    } else if (jugador2 == "") {
        alert("Falta el nombre del jugador 2");
        return false;
    } else {
        return true;
    }
}

function seleccionarFichas() {
    fichaJ1 = document.getElementById("ficha").value;
    fichaJ1 == "X" ? fichaJ2 = "O" : fichaJ2 = "X";
}

function celda(posicion) {
    if (juegoTerminado == true) {
        alert("Juego terminado");

    } else if (juegoIniciado == true) {

        if (tablero[posicion] == undefined) {

            const ficha = turno % 2 == 0 ? fichaJ1 : fichaJ2;
            tablero[posicion] = ficha;
            colocarFicha(posicion, ficha);
            verificarGanador(ficha);
            turno++;
            cambiarTurno();
        } else {
            alert("Celda ocupada");
        }
    } else {
        alert("Dar click en ¡Jugar!");
    }

}

function colocarFicha(id, fic) {
    if (fic == "X") {
        document.getElementById(id).innerHTML = "X";
        //document.getElementById(id).innerHTML = "<div class='class-x'>X</div>"; //Otra alternativa que no salió
    } else {
        //document.getElementById(id).innerHTML = "<div class='class-o'>O</div>";
        document.getElementById(id).innerHTML = "O";
    }
}

function verificarGanador(ficha) {

    cantMovimientos++;

    // for verificar filas 
    for (var i = 0; i < 10; i = i + 3) {
        if (tablero[i] == ficha && tablero[i + 1] == ficha && tablero[i + 2] == ficha && tablero[i] !== ' ') {
            ganador = true;
            mostrarResultado(ficha);
            return;
        }
    }
    //for verificar columnas

    for (var i = 0; i < 3; i++) {

        if (tablero[i] == ficha && tablero[i + 3] == ficha && tablero[i + 6] == ficha && tablero[i] !== ' ') {
            ganador = true;
            mostrarResultado(ficha);
            return;
        }
    }
    //verificar diagonales
    if ((tablero[0] == ficha && tablero[4] == ficha && tablero[8] == ficha) || (tablero[2] == ficha && tablero[4] == ficha && tablero[6] == ficha) && tablero[i] !== ' ') {
        ganador = true;
        mostrarResultado(ficha);
        return;

    }
    verificarEmpate();
}

function verificarEmpate() {

    if (cantMovimientos == 9 && ganador == false) {
        empate++;
        document.getElementById("resultado").innerHTML = "¡Empate!";
        marcador();
    }
    if (cantMovimientos <= 9 && ganador == true) {
        juegoTerminado = true;
    }

}

function mostrarResultado(ficha) {

    if (ficha == fichaJ1) {
        document.getElementById("resultado").innerHTML = "Ha ganado: " + jugador1;
        ganadosJugador1++;
        marcador();
    } else {
        document.getElementById("resultado").innerHTML = "Ha ganado: " + jugador2;
        ganadosJugador2++;
        marcador();
    }

}

function cambiarTurno() {
    var cambio = turno % 2 == 0 ? document.getElementById("turno").innerHTML = "Es el turno de: " + jugador1 : document.getElementById("turno").innerHTML = "Es el turno de: " + jugador2;
}

function marcador() {
    document.getElementById("ganadosJ1").innerHTML = ganadosJugador1;
    document.getElementById("ganadosJ2").innerHTML = ganadosJugador2;
    document.getElementById("empate").innerHTML = empate;
}
//La funcion resetear inicia una partida nueva con los otros jugadores

function jugarDeNuevo() {
    inicializarCeldas();
    vaciarTablero();
    juegoIniciado = false;
    juegoTerminado = false;
    turno = 0;
    cantMovimientos = 0;
    document.getElementById("jugador1").value = "";
    document.getElementById("jugador2").value = "";
    document.getElementById("ganadosJ1").innerHTML = "";
    document.getElementById("ganadosJ2").innerHTML = "";
    document.getElementById("empate").innerHTML = "";
    document.getElementById("turno").innerHTML = "";
    jugador1 = "";
    jugador2 = "";
    fichaJ1 = "";
    fichaJ2 = "";
    empate = 0;
    ganadosJugador1 = 0;
    ganadosJugador2 = 0;
    ganador = false;

}

function reiniciarJuego() {

    inicializarCeldas()
    vaciarTablero();
    turno = 0;
    cambiarTurno();
    cantMovimientos = 0;
    ganador = false;
    juegoTerminado = false;
    document.getElementById("turno").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";



}

function vaciarTablero() {
    tablero.length = 0;
    console.log(tablero);
}

function inicializarCeldas() {
    for (var i = 0; i < 9; i++) {
        document.getElementById(i).innerHTML = '&nbsp;';
    }
}