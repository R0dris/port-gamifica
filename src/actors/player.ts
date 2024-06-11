import { Actor, Color, Engine, Keyboard, Keys, vec } from "excalibur";

export class Player extends Actor{

    // Propriedade do Player
    private velocidade: number = 180


    // Configuração do player
    constructor() {
        super({
            pos: vec(601, 595),
            width: 32,
            height: 32,
            name:"Jogador",
            color: Color.Red
        })

    }

    onInitialize(engine: Engine<any>): void {
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