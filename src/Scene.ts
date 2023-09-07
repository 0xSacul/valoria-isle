import React from "react";
import ReactDOM from "react-dom";
import Phaser from "phaser";

import { Clothing, DefaultNPC, TiffNPC, CommunityModals } from "./types";
import { Label } from "./Components/Label";
import { CustomNPC, CustomNPCs } from "./npcs";
import { QuestModal } from "./Components/QuestModal";

const REPO_URL = "https://0xsacul.github.io/projectdignity-community-island/";

export const CommunityAPI = new window.CommunityAPI({
  id: "project_dignity",
  apiKey: "b2d2d2c0-0b0b-4b0b-8b0b-0b0b0b0b0b0b",
});

export default class ExternalScene extends window.BaseScene {
  constructor() {
    super({
      name: "local",
      map: {
        tilesetUrl: REPO_URL + "tileset.png",
      },
      player: {
        spawn: {
          x: 550, // 256  824
          y: 500, // 566  140
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

    CustomNPCs.forEach((npc) => {
      if (npc.isAnimated) {
        this.load.spritesheet(npc.id + "NPC", REPO_URL + npc.spitesheet, {
          frameWidth: npc.sheet.width,
          frameHeight: npc.sheet.height,
        });
      } else {
        this.load.image(npc.id + "NPC", REPO_URL + npc.spitesheet);
      }
    });
  }

  create() {
    super.create();

    CustomNPCs.forEach((npc) => {
      this.PlaceCustomNPC(npc);
    });

    // For local testing, allow Scene refresh with spacebar
    this.events.on("shutdown", () => {
      this.cache.tilemap.remove("local");
      this.scene.remove("local");
    });
    const spaceBar = this.input.keyboard.addKey("SPACE");
    spaceBar.on("down", () => {
      this.scene.start("default");
    });

    ReactDOM.render(
      React.createElement(QuestModal),
      document.getElementById("community-root")
    );

    console.log(CommunityAPI);
  }

  update() {
    super.update();

    //console.log(this.currentPlayer.x, this.currentPlayer.y);

    if (!this.listener) {
      this.listener =
        this.mmoService.state.context.server?.state.messages.onAdd(
          (message: any) => {
            console.log("Incoming transmission...", message);
          }
        );
    }
  }

  PlaceCustomNPC(npc: CustomNPC) {
    const custom_npc = this.add.sprite(npc.x, npc.y, npc.id + "NPC");
    if (npc.isAnimated) {
      this.anims.create({
        key: npc.id + "_anim",
        frames: this.anims.generateFrameNumbers(npc.id + "NPC", {
          start: npc.sheet.frames?.start,
          end: npc.sheet.frames?.end,
        }),
        frameRate: npc.sheet.frames?.rate,
        repeat: -1,
      });
      custom_npc.play(npc.id + "_anim", true);
    }
    custom_npc.setDepth(2);
    custom_npc.setInteractive();
    custom_npc.on("pointerover", () => {
      this.input.setDefaultCursor("pointer");
    });
    custom_npc.on("pointerout", () => {
      this.input.setDefaultCursor("default");
    });

    if (npc.modal) {
      custom_npc.on("pointerdown", () => {
        if (npc.id !== "boat" && this.CheckPlayerDistance(npc.x, npc.y)) return;

        window.openModal(npc.modal as CommunityModals);
      });
    } else {
      custom_npc.on("pointerdown", () => {
        if (npc.id !== "boat" && this.CheckPlayerDistance(npc.x, npc.y)) return;
        if (npc.onClick) npc.onClick();
      });
    }

    if (npc.name) {
      const label = new Label(this, npc.name);
      this.add.existing(label);
      label.setPosition(custom_npc.x, custom_npc.y - 12.5);
      label.setDepth(1);

      const npcBox = this.add.rectangle(
        custom_npc.x,
        custom_npc.y - 2.5,
        25,
        30,
        0x000000,
        0
      );

      this.physics.add.existing(npcBox, true);
      this.physics.add.collider(this.currentPlayer, npcBox);
    }
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
