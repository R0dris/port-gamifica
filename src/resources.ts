import { ImageFiltering, ImageSource, Loader } from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import sword from "./images/sword.png";
import logo from "./images/logo.png";
import logoV from "./images/logo-vertical.png";
import imgG from "./images/gamification.png";


import pngTilesetPath from "./maps/Room_Builder_32x32.png"
import tsxParedesPath from "./maps/tileset_paredes.tsx?url"
import tsxGenericPath from "./maps/tileset_generic.tsx?url"
import tsxEstoquePath from "./maps/tileset_estoque.tsx?url"
import tsxBibliotecaPath from "./maps/tileset_bliblioteca.tsx?url"
import tmxMapaPath from "./maps/showrrom_map.tmx?url"
import playerSpriteSheet from "./sprites/player_sprite.png"

export const Resources = {
  Sword: new ImageSource(sword),
  Logo: new ImageSource(logo),
  PlayerSpriteSheet: new ImageSource(playerSpriteSheet, {filtering: ImageFiltering.Pixel}),
  Logov: new ImageSource(logoV),
  ImageG: new ImageSource(imgG),
  Mapa: new TiledResource(tmxMapaPath, {

    pathMap:[
      {path: "showroom_map.tmx", output: tmxMapaPath},
      {path: "Room_Builder_32x32.png", output: pngTilesetPath},
      {path: "tileset_paredes.tsx", output: tsxParedesPath},
      {path: "tileset_generic.tsx", output: tsxGenericPath},
      {path: "tileset_estoque.tsx", output: tsxEstoquePath},
      {path: "tileset_bliblioteca.tsx", output: tsxBibliotecaPath},
      
    ]

})
} as const;

export const loader = new Loader();
for (const res of Object.values(Resources)) {
  loader.addResource(res);
}
