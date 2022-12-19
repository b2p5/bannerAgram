/*
Grabación de escenas con movimiento de objetos en canvas
Pasos
1.- Definir las imágenes, posición, pos.ini, variable con imagen
2.- Velocidad y aceleración
3.- Definir puntos de destino de cada imagen
4.- 




*/

let img,img_btc,img_mano;

let moverObjetos;

let hoja   = {   
                'x'       : 0 ,     'y'       : 0 , 
                'xIni'    : 0 ,     'yIni'    : 0 ,
                'alto'    : 300 ,   'ancho'   : 650, 
                'ahora'   : [ 'x', 'y' ] ,
                'img'     : null
              };
let btc    = {   
                'x'       : 0 ,     'y'       : 0 ,
                'xIni'    : 290 ,   'yIni'    : 90 , 
                'alto'    : 60 ,    'ancho'   : 60, 
                'ahora'   : [ 'x',   'y' ] ,
                'img'     : null
              };
let mano   = {   
                'x'       : 0 ,     'y'       : 0 , 
                'xIni'    : 290 ,   'yIni'    : 450 , 
                'alto'    : 50 ,    'ancho'   : 50, 
                'ahora'   : [ 'x', 'y' ] ,
                'img'     : null
              };

//Vectores velocidad y aceleracion
let aceleracion               = 0.0007;
let velocidadMaxStart         = 20;
let velocidadMaxStop          = 2;     

var start, lineaTiempo;

function preload() {
  img_hoja  = loadImage('https://b2p5.github.io/bannerAgram/images/hojaPapel7.png');
  img_btc   = loadImage('https://b2p5.github.io/bannerAgram/images/logoBTC2.png');
  img_mano  = loadImage('https://b2p5.github.io/bannerAgram/images/mano2.png');

}//fin de preload



function setup() {
  createCanvas(360, 700); //restar 80 cabecera

  //tamaños imágenes
  img_hoja.resize(hoja.alto, hoja.ancho);
  img_btc.resize(btc.alto, btc.ancho);
  img_mano.resize(mano.alto, mano.ancho);

  //Iniciliza imagenes

  //Hoja
  hoja.x          = hoja.xIni;
  hoja.y          = hoja.yIni;
  hoja.alto       = img_hoja.width;
  hoja.ancho      = img_hoja.height;
  hoja.ahora.x    = hoja.xIni;
  hoja.ahora.y    = hoja.yIni;
  hoja.img        = img_hoja;
  
  //btc
  btc.x           = btc.xIni;
  btc.y           = btc.yIni;
  btc.alto        = img_btc.width;
  btc.ancho       = img_btc.height;
  btc.ahora.x     = btc.xIni;
  btc.ahora.y     = btc.yIni;
  btc.img         = img_btc;

  //mano
  mano.x          = mano.xIni;
  mano.y          = mano.yIni;
  mano.alto       = img_mano.width;
  mano.ancho      = img_mano.height;
  mano.ahora.x    = mano.xIni;
  mano.ahora.y    = mano.yIni;
  mano.img        = img_mano;

  //Mover objetos
  moverObjetos                            = new moverObjeto();

  moverObjetos.tipoMovimiento             = 'Lineal';
  moverObjetos.aceleracion                = 0.0007;
  moverObjetos.velocidadMaxStart          = 20;
  moverObjetos.velocidadMaxStop           = 2;  

  //Escena 1 - movimiento 1
  moverObjetos.arrObjetosAMover.push ({
                                        'x'       : mano.x,
                                        'y'       : mano.y,
                                        'imagen'  : img_mano
                                      });
  moverObjetos.arrDeDestinos.push    ({
                                        'objeto'  : 'mano' , 
                                        'x'       : 299,
                                        'y'       : 120,
                                      });


  //Escena 1 - movimiento 2
  moverObjetos.arrObjetosAMover.push ({
                                        'x'       : 290,
                                        'y'       : 90,
                                        'imagen'  : img_btc
                                        });
  moverObjetos.arrDeDestinos.push    ({
                                        'objeto'  : 'btc' , 
                                        'x'       : 120,
                                        'y'       : 180,
                                      });   
                                      
  moverObjetos.arrObjetosAMover.push ({
                                        'x'       : 290,
                                        'y'       : 120,
                                        'imagen'  : img_mano
                                        });
  moverObjetos.arrDeDestinos.push    ({
                                        'objeto'  : 'mano' , 
                                        'x'       : 129,
                                        'y'       : 210,
                                      });   
  
  moverObjetos.preparaMovLineal();

  //Tiempo ini de proceso
  start = Date.now();

  frameRate(45) // This needs to be slow enough that Chrome can keep up, 5 or less is a good idea!

}//fin de setup

function draw() { 
  background(255);

  lineaTiempo =   Date.now() - start ;

  if(lineaTiempo < 2000){      // Duración 2 seg.
    image(img_hoja, 0, 0);
    image(img_btc, btc.xIni, btc.yIni);
    moverObjetos.movimientoLineal([0]); //Mueve objeto 0

  }else if(lineaTiempo < 4000){       // Duración  2 seg.
    image(img_hoja, 0, 0);
    moverObjetos.movimientoLineal([1,2]); //Mueve objetos 1 y 2

  }else if(lineaTiempo < 10000){      // Duración 6 seg.
    image(img_hoja, 0, 0);              //Congela objetos 
    image(img_btc,  120,  180);
    image(img_mano, 129, 210);

  }//fin linea de tiempo
  

}//fin de draw




















/* function mover_objeto ( datosObj , tipoMov,  datosHasta ){

  //Recta de Obj a Hasta



  image( datosObj.img, datosObj.xIni, datosObj.yIni );

} //fin function mover_objeto (obj1 = 'mano', desde = 'mano', ha */



  /* save( "banner-frame-" + frameCount + ".png")
  mejor saveFrames
  
  //check to see if the loop is done and stop the draw loop!
  if(frameCount === 2){
    console.log('loop is done');
    noLoop();
  } */