import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Transition, vec } from "excalibur";
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

        jogador.z = 2
                
        // Adicionar o player na cena
        this.add(jogador)

        // Adicionar colisão com cada objeto
        // Pegar a camada de objetos colisores
        let camadaObjetosColisores = tiledMap.getObjectLayers("Objetos colisores")[0]

        console.log(camadaObjetosColisores);

        // Percorrer objetos com for each e para cada objeto, renderizar um actor
        camadaObjetosColisores.objects.forEach(objeto => {
            const objetoAtual = new Actor({
                name: objeto.name,
                x: objeto.x + offsetx + (objeto.tiledObject.width! / 2),
                y: objeto.y + offsetY + (objeto.tiledObject.height! / 2),
                width: objeto.tiledObject.width,
                height: objeto.tiledObject.height,
                collisionType: CollisionType.Fixed

            })

            // Adicionar o colisor do objeto na cena
            this.add(objetoAtual)
        })

        
    }
}
