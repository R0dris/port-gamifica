import { Actor, CollisionType, Color, Engine, FadeInOut, Scene, Sprite, Transition, vec } from "excalibur";
import { Resources } from "../resources";
import { Player } from "../actors/player";
import { Npc } from "../actors/npc";

export class expoScene extends Scene{

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut({
            direction: direction,
            color:Color.Black,
            duration:500
        })
    }
    
    onInitialize(engine: Engine<any>): void {
        // Ativa o modo de debug
        // engine.toggleDebug()

        // Carregar musica de fundo 
        let musicaFundo =  Resources.mineBGM
        
        // Configurar a musica e executar
        musicaFundo.loop
        musicaFundo.play(2.0)

        this.backgroundColor = Color.Black

        let tiledMap = Resources.Mapa
        

        // Definir offset para renderização do mapa
        let offsetx = 138
        let offsetY = 100


        // Adicionar mapa na cena
        tiledMap.addToScene(this,{
            pos: vec(offsetx, offsetY)            
        })

        this.camera.zoom = 1.4

        // Carregar SpawnPoint do player
        let spawnPoint = tiledMap.getObjectsByName("player_spawn")[0]

        // Criação e configuração do player
        let jogador = new Player(vec(spawnPoint.x + offsetx, spawnPoint.y + offsetY))

        jogador.z = 2
                
        // Adicionar o player na cena
        this.add(jogador)

        // Pegar spawn point dos NPCs
        let npcSpawnPointA = tiledMap.getObjectsByName("npc_a")[0]
        let npcSpawnPointB = tiledMap.getObjectsByName("npc_b")[0]
        let npcSpawnPointC = tiledMap.getObjectsByName("npc_c")[0]

        // Configurar NPCs
        let npcA = new Npc(
            vec(npcSpawnPointA.x + offsetx, npcSpawnPointA.y + offsetY),
            Color.Blue,
            "NpcA"
        )
        
        let npcB = new Npc(
            vec(npcSpawnPointB.x + offsetx, npcSpawnPointB.y + offsetY),
            Color.Chartreuse,
            "NpcB"
        )
        
        let npcC = new Npc(
            vec(npcSpawnPointC.x + offsetx, npcSpawnPointC.y + offsetY),
            Color.Gray,
            "NpcC"
        )

        // Adicionar os npcs na tela
        this.add(npcA)
        this.add(npcB)
        this.add(npcC)

        // Focar a câmera no player
         this.camera.strategy.lockToActor(jogador)
        this.camera.zoom = 1.9

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
