import React from "react";
import ReactDOM from "react-dom";
import Phaser from "phaser";

import { UI, uiManager } from "./UI";
import { Label } from "./Components/Label";
import { notificationManager } from "./Components/Notification";
import { CommunityModals, DatabaseData } from "./types";

// Customs
import { CustomNPC, CustomNPCs } from "./lib/npcs";
import { CustomObject, CustomObjects } from "./lib/objects";
import { CustomAudio, CustomAudios } from "./lib/audio";

// Repo URL
const REPO_URL = "https://sacul.cloud/pd-preview/"; //"https://0xsacul.github.io/projectdignity-community-island/";

// Community API
export const CommunityAPI = new window.CommunityAPI({
  id: "projectdignity",
  apiKey: "b96ee2b5-f1e9-41e2-a54a-9cbd6d624d48",
});

let isLoaded = false;

export default class ExternalScene extends window.BaseScene {
  constructor() {
    super({
      name: "local",
      map: {
        tilesetUrl: REPO_URL + "tileset.png",
      },
      player: {
        spawn: {
          x: 567,
          y: 770,
          /* x: 350,
          y: 483, */
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
        this.load.spritesheet(npc.id + "NPC", REPO_URL + npc.spritesheet, {
          frameWidth: npc.sheet.width,
          frameHeight: npc.sheet.height,
        });
      } else {
        this.load.image(npc.id + "NPC", REPO_URL + npc.spritesheet);
      }
    });

    CustomObjects.forEach((obj) => {
      if (obj.isAnimated) {
        this.load.spritesheet(obj.id + "Object", REPO_URL + obj.spritesheet, {
          frameWidth: obj.sheet.width,
          frameHeight: obj.sheet.height,
        });
      } else {
        this.load.image(obj.id + "Object", REPO_URL + obj.spritesheet);
      }
    });

    CustomAudios.forEach((audio) => {
      this.load.audio(audio.id, REPO_URL + audio.url);
    });
  }

  create() {
    super.create();

    window.openModal({
      type: "loading",
    });

    // For local testing, allow Scene refresh with spacebar
    /* this.events.on("shutdown", () => {
      this.cache.tilemap.remove("local");
      this.scene.remove("local");
    });
    const spaceBar = this.input.keyboard.addKey("SPACE");
    spaceBar.on("down", () => {
      this.scene.start("default");
    }); */

    ReactDOM.render(
      React.createElement(UI, { scene: this }),
      document.getElementById("community-root")
    );

    CustomNPCs.forEach((npc) => {
      this.PlaceCustomNPC(npc);
    });

    CustomObjects.forEach((obj) => {
      this.PlaceCustomObject(obj);
    });

    /* await new Promise((resolve) => setTimeout(resolve, 2500)).then(() => {
      uiManager.playCutscene();
    }); */

    const ambient = this.sound.add("ambient");
    ambient.setLoop(true);
    ambient.setVolume(0.1);
    ambient.play();

    setTimeout(() => {
      notificationManager.notification({
        title: "Congratulations!",
        description: "You've achieved your first Quest!",
      });
    }, 2500);
  }

  update() {
    super.update();
    //console.log(this.currentPlayer.x, this.currentPlayer.y);

    if (!this.listener) {
      this.listener = this.mmoService.state.context.server?.onMessage(
        "player_data",
        (message: DatabaseData) => {
          if (!isLoaded) {
            isLoaded = true;
            window.closeModal();
          }
          this.updateUserData(message);
        }
      );
    }

    if (!this.leaveListener) {
      this.leaveListener = this.mmoService.state.context.server?.onLeave(() => {
        uiManager.lostConnection();
      });
    }
  }

  PlaceCustomNPC(npc: CustomNPC) {
    const custom_npc = this.add.sprite(npc.x, npc.y, npc.id + "NPC");
    custom_npc.name = npc.id + "Object";
    if (npc.isAnimated) {
      if (!this.anims.anims.entries[npc.id + "_anim"]) {
        this.anims.create({
          key: npc.id + "_anim",
          frames: this.anims.generateFrameNumbers(npc.id + "NPC", {
            start: npc.sheet.frames?.start,
            end: npc.sheet.frames?.end,
          }),
          frameRate: npc.sheet.frames?.rate,
          repeat: -1,
        });
      }

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
      const label = new Label(this as any, npc.name);
      this.add.existing(label);
      label.setPosition(custom_npc.x, custom_npc.y - 12.5);
      label.setDepth(1);

      const npcBox = this.add.rectangle(
        custom_npc.x,
        custom_npc.y,
        25,
        25,
        0x000000,
        0
      );

      this.physics.add.existing(npcBox, true);
      this.physics.add.collider(this.currentPlayer, npcBox);
    }
  }

  PlaceCustomObject(obj: CustomObject) {
    const custom_obj = this.add.sprite(obj.x, obj.y, obj.id + "Object");
    custom_obj.name = obj.id + "Object";
    if (obj.isAnimated) {
      if (!this.anims.anims.entries[obj.id + "_anim"]) {
        this.anims.create({
          key: obj.id + "_anim",
          frames: this.anims.generateFrameNumbers(obj.id + "Object", {
            start: obj.sheet.frames?.start,
            end: obj.sheet.frames?.end,
          }),
          frameRate: obj.sheet.frames?.rate,
          repeat: -1,
        });
      }

      if (!obj.hideByDefault) {
        custom_obj.play(obj.id + "_anim", true);
      }
    }
    custom_obj.setDepth(2);

    if (obj.interactable) {
      custom_obj.setInteractive();
      custom_obj.on("pointerover", () => {
        this.input.setDefaultCursor("pointer");
      });
      custom_obj.on("pointerout", () => {
        this.input.setDefaultCursor("default");
      });
    }

    if (obj.modal) {
      custom_obj.on("pointerdown", () => {
        if (obj.id !== "boat" && this.CheckPlayerDistance(obj.x, obj.y)) return;

        window.openModal(obj.modal as CommunityModals);
      });
    } else {
      custom_obj.on("pointerdown", () => {
        if (obj.id !== "boat" && this.CheckPlayerDistance(obj.x, obj.y)) return;

        if (obj.onClick) obj.onClick();
      });
    }

    if (!obj.noCollision) {
      const objBox = this.add.rectangle(
        custom_obj.x,
        custom_obj.y + 10,
        25,
        35,
        0x000000,
        0
      );

      this.physics.add.existing(objBox, true);
      this.physics.add.collider(this.currentPlayer, objBox);
    }

    if (obj.hideByDefault) {
      custom_obj.setVisible(false);
    }
  }

  updateUserData(db_data: DatabaseData) {
    if (db_data.farmId !== this.mmoService.state.context.farmId) return;
    const playerWardrobe = CommunityAPI.game.wardrobe;

    if (!db_data.quests.sacul && playerWardrobe["Project Dignity Hoodie"]) {
      db_data.quests.sacul = "owns";
    }

    this.currentPlayer.db_data = db_data;

    console.warn("[Project Dignity Island] => Player Data Updated", db_data);

    this.updateUserMapSettings(db_data);
  }

  sendQuestUpdate(quest: string, value: string) {
    const current_quests = this.currentPlayer.db_data.quests;

    if (current_quests[quest] === value) return;

    current_quests[quest] = value;

    this.mmoService.state.context.server?.send("quest_event", current_quests);
  }

  CheckPlayerDistance(x: number, y: number) {
    const player_distance = Phaser.Math.Distance.Between(
      this.currentPlayer.x,
      this.currentPlayer.y,
      x,
      y
    );
    return player_distance > 40;
  }

  DiscoverIsland() {
    console.log("Discovering island...");
  }

  PlaySound(sound_name: string, volume?: number) {
    const sound = this.sound.add(sound_name);
    if (!sound) return;

    if (this.currentSound) {
      this.currentSound.stop();
    }
    this.currentSound = sound;

    const ambient = this.sound.sounds.find(
      (sound: { key: string }) => sound.key === "ambient"
    ) as Phaser.Sound.WebAudioSound;
    ambient.pause();

    if (volume) sound.setVolume(volume);
    sound.play();

    sound.once("complete", () => {
      ambient.resume();
    });
  }

  updateUserMapSettings(db_data: DatabaseData) {
    if (!db_data.quests.secret_path) {
      /* const red_mushroom = this.children.getByName(
        "secret_path_red_mushroomObject"
      ) as Phaser.GameObjects.Sprite; */

      const collision_box = this.add.rectangle(275, 500, 100, 100, 0x000000, 0);
      collision_box.name = "secret_path_collision_box";
      this.physics.add.existing(collision_box, true);
      this.physics.add.collider(this.currentPlayer, collision_box);
    } else if (db_data.quests.secret_path === "found") {
      const not_found_tree = this.children.getByName(
        "secret_path_tree_1Object"
      ) as Phaser.GameObjects.Sprite;
      const not_found_tree_2 = this.children.getByName(
        "secret_path_tree_2Object"
      ) as Phaser.GameObjects.Sprite;
      const sparkle_tree = this.children.getByName(
        "secret_path_sparklestree1Object"
      ) as Phaser.GameObjects.Sprite;
      const sparkle_tree_2 = this.children.getByName(
        "secret_path_sparklestree2Object"
      ) as Phaser.GameObjects.Sprite;
      const fade_away_tree = this.children.getByName(
        "secret_path_fadeawaytree1Object"
      ) as Phaser.GameObjects.Sprite;
      const fade_away_tree_2 = this.children.getByName(
        "secret_path_fadeawaytree2Object"
      ) as Phaser.GameObjects.Sprite;

      not_found_tree.setVisible(false);
      not_found_tree_2.setVisible(false);
      sparkle_tree.setVisible(true);
      sparkle_tree_2.setVisible(true);
      sparkle_tree.play("secret_path_sparklestree1_anim", true);
      sparkle_tree_2.play("secret_path_sparklestree2_anim", true);

      setTimeout(() => {
        sparkle_tree.setVisible(false);
        sparkle_tree_2.setVisible(false);
        fade_away_tree.setVisible(true);
        fade_away_tree_2.setVisible(true);
        fade_away_tree.play("secret_path_fadeawaytree1_anim", true);
        fade_away_tree_2.play("secret_path_fadeawaytree2_anim", true);
      }, 10000);

      setTimeout(() => {
        not_found_tree.destroy();
        not_found_tree_2.destroy();
        sparkle_tree.destroy();
        sparkle_tree_2.destroy();
        fade_away_tree.destroy();
        fade_away_tree_2.destroy();

        const collision_box = this.children.getByName(
          "secret_path_collision_box"
        ) as Phaser.GameObjects.Rectangle;
        collision_box.destroy();

        this.sendQuestUpdate("secret_path", "done");
      }, 15000);
    } else if (db_data.quests.secret_path === "done") {
      const not_found_tree = this.children.getByName(
        "secret_path_tree_1Object"
      ) as Phaser.GameObjects.Sprite;
      const not_found_tree_2 = this.children.getByName(
        "secret_path_tree_2Object"
      ) as Phaser.GameObjects.Sprite;
      const collision_box = this.children.getByName(
        "secret_path_collision_box"
      ) as Phaser.GameObjects.Rectangle;

      if (collision_box) collision_box.destroy();
      if (not_found_tree) not_found_tree.destroy();
      if (not_found_tree_2) not_found_tree_2.destroy();
    }
  }
}

window.ExternalScene = ExternalScene;
