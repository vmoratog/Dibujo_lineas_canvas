var texto = document.getElementById('texto_lineas');
var boton = document.getElementById('botoncito');
var clear = document.getElementById('clear');
var d = document.getElementById('dibujito');
var ancho = d.width;
var lienzo = d.getContext('2d'); // 2 dimensiones
var color= document.getElementById("color");
var lado= document.getElementById("lado");
var t_canvas= document.getElementById("t-canvas");
boton.addEventListener('click', dibujoPorClick);
clear.addEventListener('click', clearCanvas);


function dibujarLinea(color, xinicial, yinicial, xfinal, yfinal) {
    lienzo.beginPath(); // funcion / metodo como js interpreta iniciar un trazo
    lienzo.strokeStyle = color;  //asigno un color para el trazo
    lienzo.moveTo(xinicial,yinicial); // funcion, indico el punto donde inicio el trazo
    lienzo.lineTo(xfinal,yfinal); // funcion, indico el punto donde finaliza el trazo
    lienzo.stroke(); // dibuja la linea
    lienzo.closePath(); // cierro el trazo (como levantar el lapiz)
}

function dibujarCirculo(color, radio) {
    lienzo.beginPath(); 
    lienzo.strokeStyle = color;
    lienzo.arc(d.width/2, d.height/2, radio, 2*Math.PI, false);
    lienzo.stroke(); 
    lienzo.closePath();
}

    function clearCanvas() {
        lienzo.clearRect(0,0,d.width,d.height) 
    }

function dibujoPorClick() {
    clearCanvas()
    var lineas = parseInt(texto.value); //el nunero de lineas
    var colour = color.value;
    var size = parseInt(t_canvas.value); // tamaño del canvas
    d.width = d.height = size
    var side = lado.value;
    const morado = "#9977EE"; 
    const naranja = "#FFDD88";
    var radio = d.width/lineas;
    var l = 0;
    var i = 0;
    var yi, xf;
    var espacio = size / lineas;
    
    if (!side
        || !lineas || lineas === 0 || isNaN(lineas) 
        || !size ||size === 0 || isNaN(size)
    ) {
        alert(" ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! \n ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!! ¡¡ERROR!!\n                              IMPOSIBLE DE DIBUJAR")
        return
    }

    for(l=0;l<lineas/4;l++) { // si no lo divido entre 4 el circulo queda del tamaño de todo el canvas
        if(l%2==0) {
            dibujarCirculo(naranja,l*radio)
        } else {
            dibujarCirculo(morado,l*radio)
        }
    }

    for(l=0; l<lineas; l++) {
        yi = espacio * l;
        xf = espacio * ( l + 1 );
        if (side === 'todo' || side === 'inferior_izquierdo')
            dibujarLinea(colour, 0, yi, xf, size); //inf izq
        if (side === 'todo' || side === 'superior_izquierdo') 
            dibujarLinea(colour, size - yi, 0, 0, xf); // sup der      
        if (side === 'todo' || side === 'inferior_derecho') 
            dibujarLinea(colour, yi, size, size, size - xf); // sup izq
        if (side === 'todo' || side === 'superior_derecho') 
            dibujarLinea(colour, size, size - yi, size - xf, 0); // der inf
    }
}