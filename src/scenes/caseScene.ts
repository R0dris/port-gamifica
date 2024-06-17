import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class CaseScene extends Scene{
    private objInteracao: any
    private textDaCena: String = ""
    elementoTexto2?: HTMLElement

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
            this.textDaCena = "Essa é a descrição do case A"
        
        // Criar elemento com a descrição da empres
        this.elementoTexto2 = document.createElement("div") as HTMLElement    

        // Definir opacidade do elemento para  1
        this.elementoTexto2.style.opacity = "1"

        // Inserir elemento no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto2)

        // Adicionar classe na div criada
    
    
        this.elementoTexto2.classList.add("gamificacao")

        // Adicionar titulo e paragrafo dentro do conteudo da div
        this.elementoTexto2.innerHTML = ` <h2>Sobre o GamificaAI</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.
        </p>`

        }
        
        if (this.objInteracao == "mesa_stand_b") {
            this.textDaCena = "Essa é a descrição do case B"
            
        }

        if (this.objInteracao == "mesa_stand_c") {
            this.textDaCena = "Essa é a descrição do case C"
            
        }


    }
    
}