import { Component, OnInit } from '@angular/core';
import { EpiedraPapelTijera } from 'src/app/enumerados/epiedra-papel-tijera.enum';
import { JugadorPiedraPapelTijera } from '../clases/jugador-piedra-papel-tijera';


const PATHIMAGENES:string ="../../../assets/imagenes/piedra-papel-tijera";

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})

export class PiedraPapelTijeraComponent implements OnInit {
    
    

  public jugador1:JugadorPiedraPapelTijera;
  public jugador2:JugadorPiedraPapelTijera;
  
  public constructor()
  {
      this.jugador1 = new JugadorPiedraPapelTijera();
      this.jugador2 = new JugadorPiedraPapelTijera();
  }
  ngOnInit(): void {
  }

  public Piedra()
  {
      $("#imagenQueCambia").attr("src",PATHIMAGENES + "/piedra.png") ;
    this.jugador1.seleccion=EpiedraPapelTijera.piedra;
  }

  public Papel()
  {
    $("#imagenQueCambia").attr("src",PATHIMAGENES + "/papel.png");
    this.jugador1.seleccion=EpiedraPapelTijera.papel;
  }

  public Tijera()
  {
    $("#imagenQueCambia").attr("src",PATHIMAGENES + "/tijera.png");
    this.jugador1.seleccion=EpiedraPapelTijera.tijera;
  }

  public GenerarRespuestaMaquina()
  {    
      this.jugador2.seleccion=Math.floor(Math.random() * (3 - 1)) + 1; 
  }

  public Jugar() ///en html cambiar por boton play
  {
      this.GenerarRespuestaMaquina();

      if(this.jugador1.seleccion == EpiedraPapelTijera.piedra)
      {
          switch (this.jugador2.seleccion) 
          {
              case EpiedraPapelTijera.piedra:
                  
                  this.Empate();
  
                  break;
  
              case EpiedraPapelTijera.papel:
                
                    
                  this.GanoJugador2();
                  
                  break;
  
              case EpiedraPapelTijera.tijera:
                  
                   this.GanoJugador1()
                  break;
          }
      }
      else if(this.jugador1.seleccion == EpiedraPapelTijera.papel)
      {
          switch (this.jugador2.seleccion) 
          {
              case EpiedraPapelTijera.piedra:
                  
                  this.GanoJugador1();
  
                  break;
  
              case EpiedraPapelTijera.papel:

                  this.Empate();
                  
                  break;
  
              case EpiedraPapelTijera.tijera:
                  
                 this.GanoJugador2();
                  break;
          }
      }
      else if(this.jugador1.seleccion == EpiedraPapelTijera.tijera)
      {
          switch (this.jugador2.seleccion) 
          {
              case EpiedraPapelTijera.piedra:
                  
                  this.GanoJugador2();
  
                  break;
  
              case EpiedraPapelTijera.papel:

                  this.GanoJugador1();
                  
                  break;
  
              case EpiedraPapelTijera.tijera:
                  
                 this.Empate();
                  break;
          }
      }
      
  }
//cambiar por mostar resultado en lo posible
  public GanoJugador1()
  {
      
      alert("Ganaste!!! \nJugador1= " + EpiedraPapelTijera[this.jugador1.seleccion] +
                       "\njugador2= " + EpiedraPapelTijera[this.jugador2.seleccion]);
  }

  public GanoJugador2()
  {
      alert("Perdiste!!!  \nJugador1= " + EpiedraPapelTijera[this.jugador1.seleccion] +
                        "\njugador2= " + EpiedraPapelTijera[this.jugador2.seleccion]);
  }

  public Empate()
  {
      alert("Empate!!!  \nJugador1= " + EpiedraPapelTijera[this.jugador1.seleccion] +
                      "\njugador2= " + EpiedraPapelTijera[this.jugador2.seleccion]);
  }


  

}