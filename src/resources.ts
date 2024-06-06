import { ImageSource, Loader } from "excalibur";
import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoV from "./images/logo-vertical.png";
import imgG from "./images/gamification.png"


export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  Logov: new ImageSource(logoV),
  ImageG: new ImageSource(imgG)
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
