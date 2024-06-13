import { Actor, Animation, CollisionType, Color, Engine, Keyboard, Keys, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../resources";

export class Player extends Actor{

    // Propriedade do Player
    private velocidade: number = 180


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
                    y: 8
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
        this.graphics.use("left-idle")

        // Configurar evento do teclado "hold"
        engine.input.keyboard.on("hold", (event) => {
            // Detectar qual tecla está pressionada
            switch (event.key) {
                case Keys.Left:
                case Keys.A:
                    // Mover pra esquerda
                    this.vel.x = -this.velocidade
                    break;

                case Keys.Right:
                case Keys.D:
                    // Mover pra direita
                    this.vel.x = this.velocidade
                    break;
                case Keys.Up:
                case Keys.W:
                    // Mover para cima
                    this.vel.y = -this.velocidade
                    break;
                case Keys.Down:
                case Keys.S:
                    // Mover para baixo
                    this.vel.y = this.velocidade
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
        })
    }
}