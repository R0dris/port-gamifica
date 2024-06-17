import { Actor, Animation, Collider, CollisionContact, CollisionType, Color, Engine, Keyboard, Keys, Side, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor{

    // Propriedade do Player
    private velocidade: number = 180
    private ultimaDirecao: string = "down"
    private objetoProximo: Boolean = false
    private ultimoColisor?: Collider

    // Configuração do player
    constructor(posicao: Vector) {
        super({
            pos: posicao,
            width: 32,
            height: 32,
            name:"Jogador",
            color: Color.Red,
            collisionType: CollisionType.Active
        })

    }

    onInitialize(engine: Engine<any>): void {


        // Configurar spritesheet do player
        const playerSpriteSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerSpriteSheet,
            grid: {
                spriteWidth: 32,
                spriteHeight: 64,
                columns: 56,
                rows: 20
            },
            spacing: {
                originOffset: {
                    y: 0
                }
            }
        })

        let imagemPlayer = playerSpriteSheet.getSprite(3,0)
        imagemPlayer.scale = (vec( 0.9 , 0.9 ))
        this.graphics.add(imagemPlayer)

        // Criar animação
        const duracaoFanim = 70
        // Animação Idle
        // Idle esquerda
        const leftidle = new Animation({
            frames: [
                { graphic: playerSpriteSheet.getSprite(12,1)},
                { graphic: playerSpriteSheet.getSprite(13,1)},
                { graphic: playerSpriteSheet.getSprite(14,1)},
                { graphic: playerSpriteSheet.getSprite(15,1)},
                { graphic: playerSpriteSheet.getSprite(16,1)},
                { graphic: playerSpriteSheet.getSprite(17,1)}
            ],
            frameDuration: duracaoFanim
        })

        this.graphics.add("left-idle", leftidle)
        // this.graphics.use("left-idle")

        // Idle Direita
        const rightIdle = new Animation({
            frames: [ 
                {graphic:playerSpriteSheet.getSprite(0,1)},
                {graphic:playerSpriteSheet.getSprite(1,1)},
                {graphic:playerSpriteSheet.getSprite(2,1)},
                {graphic:playerSpriteSheet.getSprite(3,1)},
                {graphic:playerSpriteSheet.getSprite(4,1)},
                {graphic:playerSpriteSheet.getSprite(5,1)},
            ],frameDuration: duracaoFanim
        })
        this.graphics.add("right-idle", rightIdle)
        // this.graphics.use("right-idle")

        // Idle Cima
        const upIdle = new Animation({
            frames: [ 
                {graphic:playerSpriteSheet.getSprite(6,1)},
                {graphic:playerSpriteSheet.getSprite(7,1)},
                {graphic:playerSpriteSheet.getSprite(8,1)},
                {graphic:playerSpriteSheet.getSprite(9,1)},
                {graphic:playerSpriteSheet.getSprite(10,1)},
                {graphic:playerSpriteSheet.getSprite(11,1)},
            ],frameDuration: duracaoFanim
        })
        this.graphics.add("up-idle", upIdle)
        // this.graphics.use("up-idle")
        
        // Idle Baixo
        const downIdle = new Animation({
            frames: [ 
                {graphic:playerSpriteSheet.getSprite(18,1)},
                {graphic:playerSpriteSheet.getSprite(19,1)},
                {graphic:playerSpriteSheet.getSprite(20,1)},
                {graphic:playerSpriteSheet.getSprite(21,1)},
                {graphic:playerSpriteSheet.getSprite(22,1)},
                {graphic:playerSpriteSheet.getSprite(23,1)},
            ],frameDuration: duracaoFanim
        })
        this.graphics.add("down-idle", downIdle)
        // this.graphics.use("down-idle")

        // Animação Walk
        // Andar para esquerda
        const leftWalk = new Animation({
            frames: [
                {graphic: playerSpriteSheet.getSprite(12,2)},
                {graphic: playerSpriteSheet.getSprite(13,2)},
                {graphic: playerSpriteSheet.getSprite(14,2)},
                {graphic: playerSpriteSheet.getSprite(15,2)},
                {graphic: playerSpriteSheet.getSprite(16,2)},
                {graphic: playerSpriteSheet.getSprite(17,2)}
                ], frameDuration: duracaoFanim
        })

        this.graphics.add ("left-walk", leftWalk)
        // this.graphics.use("left-walk")

        // Andar direita
        const rightWalk = new Animation({
            frames: [ 
                {graphic:playerSpriteSheet.getSprite(0,2)},
                {graphic:playerSpriteSheet.getSprite(1,2)},
                {graphic:playerSpriteSheet.getSprite(2,2)},
                {graphic:playerSpriteSheet.getSprite(3,2)},
                {graphic:playerSpriteSheet.getSprite(4,2)},
                {graphic:playerSpriteSheet.getSprite(5,2)}
            ],frameDuration: duracaoFanim
        })
        this.graphics.add("right-walk", rightWalk)
        // this.graphics.use("right-walk")


        // Andar para Cima
        const upWalk = new Animation({
            frames: [ 
                {graphic:playerSpriteSheet.getSprite(6,2)},
                {graphic:playerSpriteSheet.getSprite(7,2)},
                {graphic:playerSpriteSheet.getSprite(8,2)},
                {graphic:playerSpriteSheet.getSprite(9,2)},
                {graphic:playerSpriteSheet.getSprite(10,2)},
                {graphic:playerSpriteSheet.getSprite(11,2)}
            ],frameDuration: duracaoFanim
        })
        this.graphics.add("up-walk", upWalk)
        // this.graphics.use("up-walk")

        // Idle Biaxo
        const downWalk = new Animation({
            frames: [ 
                {graphic:playerSpriteSheet.getSprite(18,2)},
                {graphic:playerSpriteSheet.getSprite(19,2)},
                {graphic:playerSpriteSheet.getSprite(20,2)},
                {graphic:playerSpriteSheet.getSprite(21,2)},
                {graphic:playerSpriteSheet.getSprite(22,2)},
                {graphic:playerSpriteSheet.getSprite(23,2)}
            ],frameDuration: duracaoFanim
        })
        this.graphics.add("down-walk", downWalk)
        // this.graphics.use("down-walk")



        // Configurar evento do teclado "hold"
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover pra esquerda
                    this.vel.x = -this.velocidade
                    this.graphics.use("left-walk")

                    // Guarda ultima direcao
                    this.ultimaDirecao = "left"
                    break;

                case Keys.Right:
                case Keys.D:
                    // Mover pra direita
                    this.vel.x = this.velocidade
                    this.graphics.use("right-walk")

                    // Guarda ultima direcao
                    this.ultimaDirecao = "right"
                    break;
                case Keys.Up:
                case Keys.W:
                    // Mover para cima
                    this.vel.y = -this.velocidade
                    this.graphics.use("up-walk")

                    // Guarda ultima direcao
                    this.ultimaDirecao = "up"
                    break;
                case Keys.Down:
                case Keys.S:
                    // Mover para baixo
                    this.vel.y = this.velocidade
                    this.graphics.use("down-walk")

                    // Guarda ultima direcao
                    this.ultimaDirecao = "down"
                    break;
                default:
                    // Zera a velocidade do player
                    this.vel.x = 0
                    this.vel.y = 0
                    break;
            }
        })

        engine.input.keyboard.on("release" ,(event) => {
            // Parar player
            if 
            (event.key == Keys.A ||
            event.key == Keys.Left||
            event.key == Keys.D ||
            event.key == Keys.Right) {

                this.vel.x = 0

            }


            if 
            (event.key == Keys.W ||
            event.key == Keys.Up||
            event.key == Keys.S ||
            event.key == Keys.Down) {

                this.vel.y = 0

            }

            // Ao parar o plauyer, definir animação idle da ultima direção
            if (this.vel.x == 0 && this.vel.y == 0) {
                this.graphics.use(this.ultimaDirecao + "-idle")
            }
        })

        engine.input.keyboard.on("press", (event) => {
            // Se a tecla pressionada for F
            if (event.key == Keys.Space && this.objetoProximo){
                // Indentificzr o alvo da interação
                if (this.ultimoColisor?.owner.name == "mesa_stand_a") {
                    console.log("Esta é a mesa A");
                    engine.goToScene("case", {
                        sceneActivationData:{
                            // Passa o nome do Actor que interagiu com o player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_b") {
                    console.log("Esta é a mesa b");
                    engine.goToScene("case", {
                        sceneActivationData:{
                            // Passa o nome do Actor que interagiu com o player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }

                if (this.ultimoColisor?.owner.name == "mesa_stand_c") {
                    console.log("Esta é a mesa C");
                    engine.goToScene("case", {
                        sceneActivationData:{
                            // Passa o nome do Actor que interagiu com o player
                            nomeDoActor: this.ultimoColisor?.owner.name
                        }
                    })
                }
                
            }
        })

    }

    onPreCollisionResolve(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
        // Indicar que tem objeto próximo
        this.objetoProximo = true

        // Registrar ultimo objeto colidido
        this.ultimoColisor = other        
    }

    onPreUpdate(engine: Engine<any>, delta: number): void {
        // Detectar se o player está distante do ultimo objeto colidido
        if (this.ultimoColisor && this.pos.distance(this.ultimoColisor.worldPos) > 60) {
            // mMarcar que o objeto não está próximo
            this.objetoProximo = false
            console.log("Está longe");
            
        }
    }
}