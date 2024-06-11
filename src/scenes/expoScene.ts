import { Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";

export class expoScene extends Scene{

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color:Color.Black,
            duration:500
        })
    }
    
    onInitialize(engine: Engine<any>): void {
        let tiledMap = Resources.Mapa
        

        // Definir offset para renderização do mapa
        let offsetx = 138
        let offsetY = 100


        // Adicionar mapa na cena
        tiledMap.addToScene(this,{
            pos: vec(offsetx, offsetY)            
        })

        this.camera.zoom = 1.4
        // Criação e configuração do player
        let jogador = new Player()

        
        
        // Adicionar o player na cena
        this.add(jogador)

    }
}
