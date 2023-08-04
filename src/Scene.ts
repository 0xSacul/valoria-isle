import { Clothing, DefaultNPC, TiffNPC } from "./types";
import Phaser from "phaser";

export default class ExternalScene extends window.BaseScene {
  constructor() {
    super({
      name: "local",
      map: {
        tilesetUrl:
          "https://0xsacul.github.io/projectdignity-community-island/tileset.png",
        //"http://localhost:5500/public/tileset.png",
      },
      player: {
        spawn: {
          x: 760, // 256  824
          y: 635, // 566  140
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
    this.load.bitmapFont(
      "Teeny Tiny Pixls",
      "world/Teeny Tiny Pixls5.png",
      "world/Teeny Tiny Pixls5.xml"
    );

    this.load.spritesheet(
      "AnimatedSeal",
      "https://0xsacul.github.io/projectdignity-community-island/seal_sprite.png",
      {
        frameWidth: 32,
        frameHeight: 32,
      }
    );
  }

  create() {
    super.create();

    this.initialiseNPCs([
      {
        x: 745,
        y: 610,
        npc: "Tiff",
        clothing: TiffNPC,
        onClick: () => {
          if (this.CheckPlayerDistance(745, 610)) return;

          window.openModal({
            npc: {
              name: "Tiff",
              clothing: TiffNPC,
            },
            jsx: "Howdy farmer, I'm Tiffanydys but you can call me Tiff, I'm the Co-Founder of Project Dignity. Feel free to check us out!",
            buttons: [
              {
                id: "link",
                text: "Visit Project Dignity",
              },
            ],
            onButtonClick: (id: string) => {
              console.log(id);
              if (id === "link") {
                window.open("https://dignity-games.com/", "_blank");
              }
            },
          });
        },
      },
    ]);

    // Seal animation
    const seal = this.add.sprite(825, 650, "AnimatedSeal");
    this.anims.create({
      key: "seal_anim",
      frames: this.anims.generateFrameNumbers("AnimatedSeal", {
        start: 0,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    seal.play("seal_anim", true);

    // For local testing, allow Scene refresh with spacebar
    this.events.on("shutdown", () => {
      this.cache.tilemap.remove("local");
      this.scene.remove("local");
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
