import { Clothing, DefaultNPC, TiffNPC } from "./types";
import { Label } from "./Components/Label";
import { CustomNPCs } from "./npcs";
import Phaser from "phaser";

const REPO_URL = "https://0xsacul.github.io/projectdignity-community-island/";

export default class ExternalScene extends window.BaseScene {
  constructor() {
    super({
      name: "local",
      map: {
        tilesetUrl: REPO_URL + "tileset.png",
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
        url: "wss://plaza.sacul.cloud",
        roomId: "project_dignity",
        serverId: "project_dignity",
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

    // load npcs
    this.load.spritesheet(
      "TiffNPC",
      "https://0xsacul.github.io/projectdignity-community-island/npc/Tiff.png",
      {
        frameWidth: 20,
        frameHeight: 19,
      }
    );
  }

  create() {
    super.create();
    /* 
    this.initialiseNPCs([
      {
        x: 745,
        y: 610,
        npc: "Tiff",
        clothing: TiffNPC,
        onClick: () => {
          if (this.CheckPlayerDistance(745, 610)) return;

          window.openModal({
            type: "speaking",
            messages: [
              {
                text: "Howdy farmer, I'm Tiffanydys but you can call me Tiff, I'm the Co-Founder of Project Dignity. Feel free to check us out!",
                actions: [
                  {
                    text: "Visit Project Dignity",
                    cb: () => {
                      window.open("https://dignity-games.com/", "_blank");
                    },
                  },
                ],
              },
            ],
          });
        },
      },
    ]); */

    CustomNPCs.forEach((npc) => {
      this.PlaceCustomNPC(npc);
    });

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

  PlaceCustomNPC(npc: any) {
    const custom_npc = this.add.sprite(710, 500, npc.name);
    this.anims.create({
      key: npc.name + "_anim",
      frames: this.anims.generateFrameNumbers(npc.name, {
        start: 0,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
    custom_npc.play(npc.name + "_anim", true);
    custom_npc.setDepth(2);
    custom_npc.setInteractive();

    if (npc.modal) {
      custom_npc.on("pointerdown", () => {
        if (this.CheckPlayerDistance(710, 500)) return;

        window.openModal(npc.modal);
      });
    }

    const label = new Label(this, npc.name);
    this.add.existing(label);
    label.setPosition(custom_npc.x, custom_npc.y - 15);
    label.setDepth(1);
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
