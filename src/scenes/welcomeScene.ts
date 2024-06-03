import { Color, Engine, Font, Label, Scene, TextAlign, vec } from "excalibur";

export class welcomeScene extends Scene {
 
    onInitialize(engine: Engine<any>): void {
        this.backgroundColor = Color.Gray

        // Configura objeto para ser a frase "Bem Vindo"
        let fraseBemVindo = new Label ({
            text:"Bem vindo ao portfólio",
            width: 400,
            height: 50,
            pos: vec(engine.drawWidth / 2, 300),
            font: new Font({
                color: Color.White,
                size: 40,
                textAlign: TextAlign.Center
            })


        })

        // Adiciona a frase na cena
        this.add(fraseBemVindo)
    }

}