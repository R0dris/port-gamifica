import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class CaseScene extends Scene{
    private objInteracao: any
    private textDaCena: String = ""
    elementoTexto3?: HTMLElement

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut ({
            direction: direction,
            color: Color.Black,
            duration: 500
        })
        
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray



        engine.input.keyboard.on("press", (event) => {
            if (event.key == Keys.Esc){
                engine.goToScene("expo", {
                    sourceOut: new FadeInOut ({duration: 1000})
                })
            }
        })



    }




    onActivate(context: SceneActivationContext<undefined>): void {
        // Pegar dados da cena passada
        this.objInteracao = context.data

        if (this.objInteracao == "mesa_stand_a") {

        // Criar elemento com a descrição da empresa
        this.elementoTexto3! = document.createElement("div") as HTMLElement    

        // Definir opacidade do elemento para  1
        this.elementoTexto3!.style.opacity = "1"

        // Inserir elemento no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto3!)

        // Adicionar classe na div criada
        this.elementoTexto3!.classList.add("case1")

        // Adicionar titulo e paragrafo dentro do conteudo da div
        this.elementoTexto3!.innerHTML= `<h2>Case 1</h2>
        <p> alsaldlasdsadas</p>`
        
        }

        
        if (this.objInteracao == "mesa_stand_b") {
            this.textDaCena = "Essa é a descrição do case B"
            
        }

        if (this.objInteracao == "mesa_stand_c") {
            this.textDaCena = "Essa é a descrição do case C"
            
        }


    }
    
}