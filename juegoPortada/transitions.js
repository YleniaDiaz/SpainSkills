/** Variables necesarias para controlar el canvas y la imagen que se dibujará dentros */
let canvas;
let context;
let mario, gorro = [];
let interval;

/** Constante donde se almacena el margen máximo derecho al que puede llegar la imagen */
const MARGIN_RIGHT = 650;

let gorros = 4;

/** window.onload -> al cargar la ventana se crea el canvas */
window.onload = createCanvas;

/** createCanvas() -> crea el canvas y dibuja la imagen */
function createCanvas() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    inicializarCavas();
    interval = setInterval('draw()', 20);
}

function inicializarCavas(){
    //MARIO
    mario = new Objeto('mario.jpg', 0, 20, 50, 100);
    mario.imagen.onload = function() {
        context.drawImage(mario.imagen, mario.x, mario.y, mario.w, mario.h);
    };
    
    //GORROS
    for( let i=0; i<gorros; i++){
        let posicion = 50 + i*MARGIN_RIGHT/gorros + Math.random() * MARGIN_RIGHT/gorros;
        gorro[i] = new Objeto('gorro.png', posicion, 70, 50, 50);
        gorro[i].imagen.onload = function() {
            context.drawImage(gorro[i].imagen, gorro[i].x, gorro[i].y, gorro[i].w, gorro[i].h);
        };
        console.log("Posicion gorro "+i+": "+posicion);
    }
}

function Objeto(src, x, y, w, h) {
  this.imagen = new Image();
  this.imagen.src = src;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}
/** move() -> onclick botón "Mover" / se deshabilita el botón para que el usuario no pueda crear intervalos infinitos
 * y se crea el intervalo */
function move() {
    document.getElementById('btn').disabled = true;
    interval = setInterval('draw()', 20);
}

/** draw() -> dibuja la imagen mientras cambia su posición X */
function draw() {

    caminaHastaDerecha();
    context.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas
    context.drawImage(mario.imagen, mario.x, mario.y, mario.w, mario.h);
    
    //Colisiones
    for( let i=0; i<gorros; i++){
        if ( colisiona(gorro[i]) == false ){
            context.drawImage(gorro[i].imagen, gorro[i].x, gorro[i].y, gorro[i].w, gorro[i].h);
        }
    }
}

function caminaHastaDerecha() {
    if (mario.x == MARGIN_RIGHT) {
        inicializarCavas();
    } else {
        mario.x++;
    }
}

function colisiona(gorro) {
    if (mario.x+50 >= gorro.x)
        return true;
    else
        return false;
}
