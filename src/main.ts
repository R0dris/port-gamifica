import { Engine, FadeInOut } from "excalibur";
import { welcomeScene } from "./scenes/welcomeScene";
import { loader } from "./resources";
import { historyScene } from "./scenes/historyScenes";
import { gamificationScene } from "./scenes/gamificationScene";
import { expoScene } from "./scenes/expoScene";
import { CaseScene } from "./scenes/caseScene";



const game = new Engine({
  width:1200,
  height:800,
  canvasElementId: "jogo",
  pixelArt: true
})

game.addScene("bemvindo", new welcomeScene())
game.addScene("historia", new historyScene())
game.addScene("gamificacao", new gamificationScene())
game.addScene("expo", new expoScene)
game.addScene("case", new CaseScene)


game.start(loader).then ( () => {
  game.goToScene("expo", {
    sourceOut: new FadeInOut ({duration: 1000})
  })
})