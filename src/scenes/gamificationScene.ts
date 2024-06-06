import { Actor, Color, Engine, Scene, vec } from "excalibur";
import { Resources } from "../resources";

export class gamificationScene extends Scene{

    elementoTexto2?: HTMLElement

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.fromHex("#403f4c")


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























        // Configurar Actor da imagem
        let actorimg = new Actor({
            pos: vec(engine.halfDrawHeight - 150, 350),

        })

        // Utilizar imagem 
        let imagemGame = Resources.ImageG.toSprite()

        // Aplicar zoom na imagem
        imagemGame.scale = vec(0.8, 0.8)

        // Configurar o ator para usar a imagem
        actorimg.graphics.add(imagemGame)


        // Adicionando imagem na tela
        this.add(actorimg)

        
    }
}