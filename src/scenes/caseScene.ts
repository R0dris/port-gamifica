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

        // Criar elemento com a descrição do texto
        this.elementoTexto3 = document.createElement("div") as HTMLElement
        this.elementoTexto3.classList.add("texto-case")

        // Adicionar o elemento ao container game
        let containerGame = document.querySelector(".container-game")
        containerGame?.appendChild(this.elementoTexto3)
    }





    onActivate(context: SceneActivationContext<undefined>): void {
        // Pegar dados da cena passada
        this.objInteracao = context.data
        this.elementoTexto3!.style.opacity = "1"

        if (this.objInteracao == "mesa_stand_a") {
            this.elementoTexto3!.innerHTML = `<h2> Case 1</h2> 
            <p>adfvgfqdfgbdngfd</p>`
            
        }

        
        if (this.objInteracao == "mesa_stand_b") {
            this.textDaCena = "Essa é a descrição do case B"
            this.elementoTexto3!.innerHTML = `<h2> Case 2</h2> 
            <p>adfvgfq4243234</p>`
        }

        if (this.objInteracao == "mesa_stand_c") {
            this.textDaCena = "Essa é a descrição do case C"
            this.elementoTexto3!.innerHTML = `<h2> Case 3</h2> 
            <p>132456754321</p>`
        }


    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        this.elementoTexto3!.style.opacity = "0"
    }
    
}