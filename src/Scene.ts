import { Clothing, DefaultNPC } from "./types";
import Phaser from "phaser";

export default class ExternalScene extends window.BaseScene {
  constructor() {
    super({
      name: "community_island",
      map: {
        tilesetUrl:
          "https://0xsacul.github.io/projectdignity-community-island/tileset.png",
        //tilesetUrl: "http://localhost:5500/tileset.png",
      },
      player: {
        spawn: {
          x: 256, // 256  824
          y: 566, // 566  140
        },
      },
      mmo: {
        enabled: true,
        //url: "ws://localhost:2567/",
        //roomId: "local", // Need to be ingals_main once fixed on SFL side.
      },
    });
  }

  preload() {
    super.preload();

    this.load.bitmapFont(
      "Small 5x3",
      "world/small_3x5.png",
      "world/small_3x5.xml"
    );
    this.load.bitmapFont("pixelmix", "world/7px.png", "world/7px.xml");
  }

  create() {
    super.create();

    this.initialiseNPCs([
      {
        x: 280,
        y: 532.5,
        npc: "Tiff",
        clothing: DefaultNPC,
        onClick: () => {
          if (this.CheckPlayerDistance(280, 532.5)) return;

          window.openModal({
            npc: {
              name: "Tiff",
              clothing: DefaultNPC,
            },
            jsx: "Howdy farmer, welcome on Project Dignity's Island!",
          });
        },
      },
    ]);

    // For local testing, allow Scene refresh with spacebar
    this.events.on("shutdown", () => {
      this.cache.tilemap.remove("community_island");
      this.scene.remove("community_island");
    });
    const spaceBar = this.input.keyboard.addKey("SPACE");
    spaceBar.on("down", () => {
      this.scene.start("default");
    });
  }

  update() {
    super.update();
    /* 
          display player position for debugging
      */
    //console.log(this.currentPlayer.x, this.currentPlayer.y);
  }

  CheckPlayerDistance(x: number, y: number) {
    let player_distance = Phaser.Math.Distance.Between(
      this.currentPlayer.x,
      this.currentPlayer.y,
      x,
      y
    );
    return player_distance > 40;
  }
}

window.ExternalScene = ExternalScene;
