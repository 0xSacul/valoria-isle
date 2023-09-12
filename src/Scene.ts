import React from "react";
import ReactDOM from "react-dom";
import Phaser from "phaser";

import { UI } from "./UI";
import { eventManager } from "./EventsManager";
import { Label } from "./Components/Label";
import { CommunityModals, DatabaseData } from "./types";

// Customs
import { CustomNPC, CustomNPCs } from "./lib/npcs";
import { CustomObject, CustomObjects } from "./lib/objects";
import { CustomAudio, CustomAudios } from "./lib/audio";

// Repo URL
const REPO_URL = "https://0xsacul.github.io/valoria-isle/";

// Community API
export const CommunityAPI = new window.CommunityAPI({
  id: "valoria_isle",
  apiKey: "b96ee2b5-f1e9-41e2-a54a-9cbd6d624d48",
});

let isLoaded = false;

export default class ExternalScene extends window.BaseScene {
  constructor() {
    super({
      name: "valoria_isle",
      map: {
        tilesetUrl: REPO_URL + "tileset.png" + `?v=${Date.now()}`,
      },
      player: {
        spawn: {
          x: 567, // SPAWN
          y: 770,
        },
      },
      mmo: {
        enabled: true,
        url: "wss://plaza.sacul.cloud",
        roomId: "valoria",
        serverId: "valoria",
      },
    });
  }

  preload() {
    super.preload();

    CustomNPCs.forEach((npc: CustomNPC) => {
      if (npc.isAnimated) {
        this.load.spritesheet(
          npc.id + "NPC",
          REPO_URL + npc.spritesheet + `?v=${Date.now()}`,
          {
            frameWidth: npc.sheet.width,
            frameHeight: npc.sheet.height,
          }
        );
      } else {
        this.load.image(
          npc.id + "NPC",
          REPO_URL + npc.spritesheet + `?v=${Date.now()}`
        );
      }
    });

    CustomObjects.forEach((obj: CustomObject) => {
      if (obj.isAnimated) {
        this.load.spritesheet(
          obj.id + "Object",
          REPO_URL + obj.spritesheet + `?v=${Date.now()}`,
          {
            frameWidth: obj.sheet.width,
            frameHeight: obj.sheet.height,
          }
        );
      } else {
        this.load.image(
          obj.id + "Object",
          REPO_URL + obj.spritesheet + `?v=${Date.now()}`
        );
      }
    });

    CustomAudios.forEach((audio: CustomAudio) => {
      this.load.audio(audio.id, REPO_URL + audio.url + `?v=${Date.now()}`);
    });
  }

  create() {
    super.create();

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

    const ambient = this.sound.add("ambient");
    ambient.setLoop(true);
    ambient.setVolume(0.05);
    ambient.play();

    const collision_box = this.add.rectangle(275, 500, 100, 100, 0x000000, 0);
    collision_box.name = "secret_path_collision_box";
    this.physics.add.existing(collision_box, true);
    this.physics.add.collider(this.currentPlayer, collision_box);
  }

  update() {
    super.update();
    if (!isLoaded) this.input.keyboard.enabled = false;

    //console.warn(this.currentPlayer.x + " " + this.currentPlayer.y);

    if (!this.playerDatalistener) {
      this.playerDatalistener = this.mmoService.state.context.server?.onMessage(
        "player_data",
        (data: DatabaseData) => {
          if (!isLoaded) {
            isLoaded = true;
            this.input.keyboard.enabled = true;
            console.warn("[Valoria Isle] => Loaded");
            eventManager.emit("loading", false);
          }

          this.updateUserData(data);
        }
      );
    }

    if (!this.questListener) {
      this.questListener = this.mmoService.state.context.server?.onMessage(
        "quest_hoodie",
        (data: { [key: string]: number }) => {
          this.hoodieLeft = data.hoodieLeft as number | 0;
        }
      );
    }

    if (!this.leaveListener) {
      this.leaveListener = this.mmoService.state.context.server?.onLeave(() => {
        console.error("[Valoria Isle] => Lost connection to server");
        eventManager.emit("lostConnection");
      });
    }

    if (!this.idkWhyIHaveToListenToThis) {
      this.idkWhyIHaveToListenToThis =
        this.mmoService.state.context.server?.onMessage(
          "__playground_message_types",
          () => {}
        );
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
      label.setPosition(custom_npc.x, custom_npc.y - 15);
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
          repeat: obj.sheet.loop ? -1 : 0,
        });
      }

      if (!obj.hideByDefault && !obj.idle) {
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
    if (!db_data) return;
    if (db_data.farmId !== this.mmoService.state.context.farmId) return;

    if (db_data.canAccess === false) {
      eventManager.emit("banned");
      return;
    }

    const playerWardrobe = CommunityAPI.game.wardrobe;

    if (
      !db_data.quests.season_1.sacul &&
      playerWardrobe["Project Dignity Hoodie"]
    ) {
      db_data.quests.season_1.sacul = "owns";
    }

    this.currentPlayer.db_data = db_data;

    console.warn("[Valoria Isle] => Player Data Updated", db_data);

    this.updateUserMapSettings(db_data);
  }

  sendQuestUpdate(season: string, quest: string, value: string) {
    if (season === "season_1") {
      const current_quests = this.currentPlayer.db_data.quests;

      if (current_quests[season][quest] === value) return;

      current_quests[season][quest] = value;

      this.mmoService.state.context.server?.send("quest_event", current_quests);
    }
  }

  updateRemainingHoodies(removeOne: boolean) {
    return this.mmoService.state.context.server?.send("quest_hoodie", {
      removeOne,
    });
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

  // Well umh this is a mess but it works - Need a rework later - Rework done kek
  updateUserMapSettings(db_data: DatabaseData) {
    if (db_data.quests.season_1.final !== "done") {
      const end_quest_chest = this.children.getByName(
        "end_quest_chestObject"
      ) as Phaser.GameObjects.Sprite;
      end_quest_chest.anims.play("end_quest_chest_anim", true);
    } else {
      const end_quest_chest = this.children.getByName(
        "end_quest_chestObject"
      ) as Phaser.GameObjects.Sprite;
      end_quest_chest.anims.stop();
      end_quest_chest.setFrame(0);
    }

    if (db_data.quests.season_1.secret_path === "found") {
      const collision_box = this.children.getByName(
        "secret_path_collision_box"
      ) as Phaser.GameObjects.Sprite;
      const trees = this.children.getByName(
        "secret_path_treesObject"
      ) as Phaser.GameObjects.Sprite;
      trees.play("secret_path_trees_anim", true);

      trees.once("animationcomplete", () => {
        collision_box.x = 0; // In case somehow the box doesn't get destroyed
        collision_box.y = 0;
        collision_box.destroy();
        trees.setVisible(false);
        trees.destroy();

        this.sendQuestUpdate("season_1", "secret_path", "done");
      });
    }

    if (db_data.quests.season_1.secret_path === "done") {
      const collision_box = this.children.getByName(
        "secret_path_collision_box"
      ) as Phaser.GameObjects.Sprite;
      const trees = this.children.getByName(
        "secret_path_treesObject"
      ) as Phaser.GameObjects.Sprite;

      collision_box.x = 0; // In case somehow the box doesn't get destroyed
      collision_box.y = 0;
      collision_box.destroy();
      trees.setVisible(false);
      trees.destroy();
    }
  }

  Season1EndQuestAnimation() {
    const arcadian_mechanism = this.children.getByName(
      "arcadian_mechanismObject"
    ) as Phaser.GameObjects.Sprite;
    const arcadian_mechanism_cloud = this.children.getByName(
      "arcadian_mechanism_cloudObject"
    ) as Phaser.GameObjects.Sprite;

    this.input.keyboard.enabled = false;
    this.currentPlayer.x = 780;
    this.currentPlayer.y = 370;

    arcadian_mechanism.play("arcadian_mechanism_anim", true);
    arcadian_mechanism.once("animationcomplete", () => {
      this.currentPlayer.x = 780;
      this.currentPlayer.y = 370;
      arcadian_mechanism_cloud.setVisible(true);
      arcadian_mechanism.setFrame(0);
      arcadian_mechanism.stop();

      eventManager.emit(
        "dialogue",
        "What is.. Oh my.. Traveler you're flying!"
      );

      this.tweens.add({
        targets: [arcadian_mechanism_cloud],
        x: 585,
        y: 200,
        duration: 7500,
        ease: "Power3",
        onComplete: () => {
          eventManager.emit("dialogue", "");
          this.input.keyboard.enabled = true;

          this.tweens.add({
            targets: arcadian_mechanism_cloud,
            alpha: 0,
            duration: 2000,
            ease: "Linear",
            onComplete: () => {
              arcadian_mechanism_cloud.setVisible(false);
              arcadian_mechanism_cloud.setAlpha(1);
            },
          });
        },
      });

      this.tweens.add({
        targets: [this.currentPlayer],
        x: 585,
        y: 185,
        duration: 7500,
        ease: "Power3",
      });
    });
  }

  sendPlayerToSpawn() {
    eventManager.emit("dialogue", "");
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.currentPlayer.x = 567;
        this.currentPlayer.y = 770;
        setTimeout(() => {
          this.cameras.main.fadeIn(1000, 0, 0, 0);
        }, 1000);
      }
    );
  }

  killBudsPopup() {}
}

window.ExternalScene = ExternalScene;
