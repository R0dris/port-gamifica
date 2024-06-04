import { Actor, Color, Engine, FadeInOut, Font, Keys, Label, Scene, TextAlign, Transition, vec } from "excalibur";
import { Resources } from "../resources";

export class welcomeScene extends Scene {

    fraseIniciar?: Label
    onTransition(direction: "in" | "out"): Transition | undefined {
        return new FadeInOut ({
            direction: direction,
            color: Color.Black,
            duration: 1000
        })
    }

    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Black

        // Configura objeto para ser a frase "Bem Vindo"
        let fraseBemVindo = new Label({
            text: "Bem vindo ao portfólio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center,
                family: "Anta"
            })


        })

        // Adiciona a frase na cena
        this.add(fraseBemVindo)


        // Configurar Actor do logo
        let actorLogo = new Actor({
            pos: vec(engine.drawWidth / 2, 430),

        })

        // Utilizar imagem logo
        let imagemLogo = Resources.Logo.toSprite()

        // Aplicar zoom na imagem
        imagemLogo.scale = vec(0.4, 0.4)

        // Configurar o ator para usar a imagem
        actorLogo.graphics.add(imagemLogo)


        // Adicionando actorLogo na tela
        this.add(actorLogo)



        // Configura objeto para ser a frase "Bem Vindo"
        this.fraseIniciar = new Label({
            text: 'Pressione "Enter" para iniciar....',
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 670),
            font: new Font({
                color: Color.White,
                size: 20,
                textAlign: TextAlign.Center,
                family: "Anta",

            })



        })

        // Adiciona a frase na cena
        this.add(this.fraseIniciar)



        this.fraseIniciar?.actions.repeatForever(context => {
            context.fade(0, 1000)
            context.fade(1, 1000)
        })

        // Monitora o evento de tecla pressionada
        this.input.keyboard.on("press", (event) => {
            // Caso a tecla pressionada for enter, deve ir para a próxima cena
            if (event.key == Keys.Enter)
            {
                // Direciona para a cena História
                engine.goToScene("historia",
                {
                    sourceOut: new FadeInOut ({duration: 1000})
                })
                
            }
        }) 

    }



}

