import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/clases/score/score';
import { ScoreService } from 'src/app/services/score/score.service';
import { ETateTi, JugadorTaTeTI } from '../clases/jugador-ta-te-ti';

const PATHX="../../../../../assets/imagenes/Ta-te-ti/ImagenX.svg";
const PATHCIRCULO="../../../../../assets/imagenes/Ta-te-ti/ImagenO.svg";

@Component({
  selector: 'app-ta-te-ti',
  templateUrl: './ta-te-ti.component.html',
  styleUrls: ['./ta-te-ti.component.css']
})
export class TaTeTiComponent implements OnInit {

  public ruta:string;
  public jugador1:JugadorTaTeTI;
  public jugador2:JugadorTaTeTI;
  public tablero=[0, 0, 0, 0, 0, 0, 0, 0, 0];
  public contador=0;
  public estadoPartida=true;
  public rutaScore='score/TaTeTi';

  public nuevoScore = new Score();

  constructor(private servicioScore:ScoreService) 
  { 
     this.ruta="";
     this.jugador1=new JugadorTaTeTI();
     this.jugador2=new JugadorTaTeTI();
    
  }
  ngOnInit(): void {
    this.ruta="holaMUNDO/ta-te-ti";
  }

  public ElegirCasilla(seleccion:string)
  { 
   
    if(this.estadoPartida)
    {
        this.jugador1.seleccion =parseInt(seleccion);

        if(this.ValidarRespuesta(this.jugador1.seleccion))
        {
          this.tablero[this.jugador1.seleccion]=1;
          $("#celda"+ETateTi[this.jugador1.seleccion]).attr("src",PATHX);
          $("#celda"+ETateTi[this.jugador1.seleccion]).css("visibility","visible");

          if(this.Ganaste(1))
          {
            alert("Ganaste");
            this.jugador1.victorias++;
          }
          else
          {
            this.GenerarRespuestaMaquina();
          }
        }
    }   
  }

  public GenerarRespuestaMaquina()
  {    
      let flag=false;

      do {
        this.jugador2.seleccion=Math.floor(Math.random() * (8 - 0)) + 0; 

        if(this.ValidarRespuesta(this.jugador2.seleccion))
        {
          this.tablero[this.jugador2.seleccion]=-1;          
          
          $("#celda"+ETateTi[this.jugador2.seleccion]).attr("src",PATHCIRCULO);
          $("#celda"+ETateTi[this.jugador2.seleccion]).css("visibility","visible");
          flag=true;

          if(this.Ganaste(-1))
          alert("Perdiste");
          this.jugador2.victorias++;
          
        }
        else if(this.contador>=8)
        {
          flag=true;
          alert("Empate");
        }
        
      } while (!flag);

  }

  public ValidarRespuesta(seleccion:ETateTi):boolean
  {
      
      let retorno:boolean=true;
      
        if(this.tablero[seleccion] == 1 || this.tablero[seleccion] == -1)
        {
           retorno=false;
        }

      return retorno;
  }

  public Ganaste(jugador:number)
  {
      let retorno=false;
      this.contador++;
      console.log(this.contador);

    if(this.tablero[0]==jugador && this.tablero[1]==jugador && this.tablero[2]==jugador)
    retorno=true;
    if(this.tablero[3]==jugador && this.tablero[4]==jugador && this.tablero[5]==jugador)
    retorno=true;
    if(this.tablero[6]==jugador && this.tablero[7]==jugador && this.tablero[8]==jugador)
    retorno=true;
    if(this.tablero[0]==jugador && this.tablero[3]==jugador && this.tablero[6]==jugador)
    retorno=true;
    if(this.tablero[1]==jugador && this.tablero[4]==jugador && this.tablero[7]==jugador)
    retorno=true;
    if(this.tablero[2]==jugador && this.tablero[5]==jugador && this.tablero[8]==jugador)
    retorno=true;
    if(this.tablero[0]==jugador && this.tablero[4]==jugador && this.tablero[8]==jugador)
    retorno=true;
    if(this.tablero[2]==jugador && this.tablero[4]==jugador && this.tablero[6]==jugador)
    retorno=true;

    if(retorno)
    {
      this.estadoPartida=false;
    }
    
    return retorno;
    
    
    
    
  }


  public Reiniciar()
  {
    for(let i=0;i<this.tablero.length;i++)
    {
      this.tablero[i]=0;
      $("#celda"+ETateTi[i]).css("visibility","hidden");
      //$("#celda"+ETateTi[i]).attr("src","");
    }
  
    this.contador=0;
      this.estadoPartida=true;
  }

  public GuardarScore(){
    let nuevoScore:Score=new Score();
    nuevoScore.name=localStorage.getItem("usuarioLogin")??"Desconocido";
    nuevoScore.score='jugador uno= ' + this.jugador1.victorias + '  jugador dos= '+this.jugador2.victorias;
    this.servicioScore.AgregarUno(nuevoScore);
    alert('guardado');
    
  }




}
