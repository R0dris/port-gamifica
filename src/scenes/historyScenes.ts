import { Actor, Color, Engine, FadeInOut, Keys, Scene, SceneActivationContext, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class historyScene extends Scene{

    elementoTexto?: HTMLElement

    // Método para esmaecer um elemento HTML
    fadeOutElement(elemento: HTMLElement){
        // Pegar opacidade do elemnto HTML
        let opacidade = parseFloat(elemento.style.opacity)
        setInterval ( () => {

            if (opacidade > 0 ) {
                // Diminuir a opacidade 
                opacidade -= 0.02
                // Atualizar a opacidade do elemento
                elemento.style.opacity = opacidade.toString()
            }

        }, 20)
        // Se a opacidade esta visivel
    }

    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut ({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")
        
        

        // Criar elemento com a descrição da empres
        this.elementoTexto = document.createElement("div") as HTMLElement    

        // Definir opacidade do elemento para  1
        this.elementoTexto.style.opacity = "1"

        // Inserir elemento no container-game
        let containerGame = document.querySelector(".container-game") as HTMLElement
        containerGame.appendChild(this.elementoTexto)

        // Adicionar classe na div criada
        this.elementoTexto.classList.add("sobre-gamifica")

        // Adicionar titulo e paragrafo dentro do conteudo da div
        this.elementoTexto.innerHTML = ` <h2>Sobre o GamificaAI</h2>
        <p>Nossa empresa cria soluções de gamificação personalizadas para empresas de todos os tamanhos e setores,
          usando inteligência artificial e design de jogos para desenvolver estratégias interativas que melhoram a
          experiência do usuário e impulsionam resultados. Acreditamos no poder dos jogos e da tecnologia para engajar
          equipes, aumentar a produtividade e motivar, adaptando cada projeto às necessidades específicas do cliente,
          desde programas de treinamento interativo até sistemas de recompensa e engajamento de funcionários.
        </p>`

         // Configurar Actor do logo
         let actorLogoV = new Actor({
            pos: vec(900, engine.halfDrawHeight + 30),

        })

        // Utilizar imagem logo
        let imagemLogo = Resources.Logov.toSprite()

        // Aplicar zoom na imagem
        imagemLogo.scale = vec(0.7, 0.7)

        // Configurar o ator para usar a imagem
        actorLogoV.graphics.add(imagemLogo)


        // Adicionando actorLogo na tela
        this.add(actorLogoV)



        // Monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for enter, deve ir para a próxima cena
            if (event.key == Keys.Enter)
            {

                // Transição de remoção de texto
                this.fadeOutElement(this.elementoTexto!)

                // Direciona para a cena História
                engine.goToScene("gamificacao",
                {
                    sourceOut: new FadeInOut ({duration: 1000})
                })
                
            }
        }) 

    }

    onDeactivate(context: SceneActivationContext<undefined>): void {
        // Remover elemento texto da tela
        this.elementoTexto?.remove()
    }

}