class moverObjeto  {

   constructor(){

      //Tipo de movimiento
      this.tipoMovimiento            = 'Lineal';

      //Vectores localizacion, velocidad y aceleracion
      this.aceleracion               = 0.0007;
      this.velocidadMaxStart         = 20;
      this.velocidadMaxStop          = 2;

      //Array de contenidos
      this.arrObjetosAMover          = Array();
      this.arrDeDestinos             = Array();

      this.distanciaADestino;
      this.todoQuieto;

      // //Array de vectores vel., acel., vel. max. etc
      this.arrLocalizaciones         =  Array();
      this.arrVelocidades            =  Array();
      this.arrAceleraciones          =  Array();
      this.arrVelocidadMax           =  Array();
      this.arrObjetosFin             =  Array();
      

    }//fin constructor



    //Método prepara Movimiento Lineal
    /////////////////////////////////////////////////////////////
    preparaMovLineal(){

      var unaXVelocidad ;
      var unaYVelocidad ;
      var velocidadNormalizada;
      var aceleracionNormalizada;
      
            
      //Mover los Objetos 
      for(let i=0; i < this.arrObjetosAMover.length; i++) {
      
          //Vectores localización, velocidad y aceleración
          //Localizaciones
          this.arrLocalizaciones.push( createVector(this.arrObjetosAMover[i].x,
                                                    this.arrObjetosAMover[i].y  ));
          //Velocidades ejes X e Y
          unaXVelocidad = (this.arrDeDestinos[i].x - this.arrObjetosAMover[i].x);
          unaYVelocidad = (this.arrDeDestinos[i].y - this.arrObjetosAMover[i].y);
          //Velocidad normalizada      
          velocidadNormalizada = createVector(unaXVelocidad, unaYVelocidad ).normalize();
          
          //Ecuación e=v*t
          this.arrVelocidades.push( velocidadNormalizada );
          
          //Aceleración normalizada = vector velocidad * aceleración
          aceleracionNormalizada =   createVector( this.aceleracion * unaXVelocidad,  
                                                   this.aceleracion * unaYVelocidad );
          
          this.arrAceleraciones.push( aceleracionNormalizada );
          
          //Velocidad Máxima
          this.arrVelocidadMax.push(this.velocidadMaxStart);
          
          
          this.arrObjetosFin.push(false);
          
          
      }// fin de for(let i=0; i<objetosColocados.


    }//fin preparaMovLineal()




    //Método movimientoLineal
    /////////////////////////////////////////////////////////////
    movimientoLineal(aMover){

      for(let i=0; i < this.arrObjetosAMover.length; i++) {  

        if (!(aMover.includes(i) )){
          continue;
        }
         
        //Aplicar velocidad y aceleración
        this.arrVelocidades[i].add(this.arrAceleraciones[i]);
        this.arrVelocidades[i].limit(this.arrVelocidadMax[i]);
        this.arrLocalizaciones[i].add(this.arrVelocidades[i]);

        //Donde está ahora
        if(this.arrDeDestinos[i].objeto = 'mano'){
          mano.ahora.x = this.arrLocalizaciones[i].x;
          mano.ahora.y = this.arrLocalizaciones[i].y;

        }else if(this.arrDeDestinos[i].objeto = 'btc'){
          btc.ahora.x = this.arrLocalizaciones[i].x;
          btc.ahora.y = this.arrLocalizaciones[i].y;

        }
 

        this.distanciaADestino = calculaDistancia ( 
                                (this.arrLocalizaciones[i].x) , (this.arrLocalizaciones[i].y) ,
                                (this.arrDeDestinos[i].x),      (this.arrDeDestinos[i].y) 
                                );
   
        if( int(this.distanciaADestino)  < 47  ) {
          this.arrAceleraciones[i]        = 0.0001;
          this.arrVelocidadMax[i]         = this.velocidadMaxStop;

        }else if( int(this.distanciaADestino)  < 3  ) {
          this.arrLocalizaciones[i].x     = this.arrDeDestinos[i].x;
          this.arrLocalizaciones[i].y     = this.arrDeDestinos[i].y;
          this.arrAceleraciones[i]        = 0;
          this.arrVelocidades[i]          = 0;
          this.arrVelocidadMax[i]         = 0;
          console.log(lineaTiempo);

        }//fin   if( int(this.distanciaADestino)  < 100

        image(this.arrObjetosAMover[i].imagen, 
              this.arrLocalizaciones[i].x, 
              this.arrLocalizaciones[i].y );


      }//fin for(let i=0; i < this.arrObjetosAMover.length



    }//fin movimientoLineal()



}// fin de class moverObjeto


/////////////////////////////////////////////////////////////////////////////
//Funciones
/////////////////////////////////////////////////////////////////////////////
function calculaDistancia ( x1, y1, x2, y2 ) {

  return Math.sqrt((x1-x2)**2 + (y1-y2)**2);

}//fin de function posicionado