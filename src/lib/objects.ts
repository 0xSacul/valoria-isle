import { questModalManager } from "../Components/QuestModal";
import { eventManager } from "../EventsManager";

export type CustomObject = {
  id: string;
  x: number;
  y: number;
  spritesheet: string;
  sheet: {
    frames?: {
      start: number;
      end: number;
      rate: number;
    };
    width: number;
    height: number;
    loop?: boolean;
  };
  isAnimated: boolean;
  idle?: boolean;
  onClick?: () => void;
  modal?: {
    type: string;
    messages: {
      text: string;
      actions?: {
        text: string;
        cb: () => void;
      }[];
    }[];
  };
  noCollision?: boolean;
  interactable?: boolean;
  hideByDefault?: boolean;
};

export const CustomObjects: CustomObject[] = [
  {
    id: "seal",
    x: 680,
    y: 820,
    isAnimated: true,
    spritesheet: "assets/npc/Seal.png",
    sheet: {
      frames: {
        start: 0,
        end: 19,
        rate: 10,
      },
      width: 32,
      height: 32,
      loop: true,
    },
    noCollision: true,
  },
  {
    id: "boat",
    x: 520,
    y: 840,
    spritesheet: "assets/objects/Boat.png",
    isAnimated: false,
    sheet: {
      width: 80,
      height: 48,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Howdy young traveler! Jump in if you want to go home!",
          actions: [
            {
              text: "Go Home",
              cb: () => {
                eventManager.emit("unmountUI");
                window.history.back();
              },
            },
          ],
        },
      ],
    },
    noCollision: true,
    interactable: true,
  },
  {
    id: "boat_smoke",
    x: 480,
    y: 810,
    spritesheet: "assets/objects/BoatSmoke.png",
    isAnimated: true,
    sheet: {
      frames: {
        start: 0,
        end: 29,
        rate: 10,
      },
      width: 24,
      height: 19,
      loop: true,
    },
    noCollision: true,
  },
  {
    id: "spawn_wooden_sign",
    x: 600,
    y: 730,
    spritesheet: "assets/objects/WoodenSign.png",
    isAnimated: false,
    sheet: {
      width: 16,
      height: 15,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Welcome on Valoria Island!",
        },
        {
          text: "This is a community project, made by Project Dignity, for the community!",
        },
        {
          text: "Here at Project Dignity, we really wanted to create something that would be fun for everyone while also being a great way to introduce new players to the game!",
        },
        {
          text: "The Island is a great place to start your adventure, and we hope you'll enjoy it! Don't forget to walk around and talk to people, you might find some interesting quests!",
        },
        {
          text: "You'll also see that in our Island we keep some kind of roleplay, so don't take this sign as a part of our lore, it's just a way to introduce you to the Island!",
        },
        {
          text: "Last thing, a huuuuge shoutout to the amazing team that worked on this project,",
        },
        {
          text: "Sacul - Lead Developer & Project Manager, Ded - Game & Map Designer, Shykun - Animations & Art, Boden - Artist, Paluras - Artist",
        },
        {
          text: "Much love, Dignity's Team.",
        },
      ],
    },
    interactable: true,
    noCollision: true,
  },

  // -----------------------------------

  {
    id: "secret_path_trees",
    x: 296,
    y: 483,
    spritesheet: "assets/objects/TreesFadeAway.png",
    isAnimated: true,
    idle: true,
    sheet: {
      width: 64,
      height: 48,
      frames: {
        start: 1,
        end: 77,
        rate: 10,
      },
      loop: false,
    },
    noCollision: true,
  },

  // -----------------------------------

  {
    id: "secret_path_mushrooms",
    x: 262.5,
    y: 485,
    spritesheet: "assets/objects/LittleBlueMushrooms.png",
    isAnimated: false,
    sheet: {
      width: 16,
      height: 16,
    },
    noCollision: true,
  },
  {
    id: "secret_path_mushroom",
    x: 292.5,
    y: 485,
    spritesheet: "assets/objects/LittleBlueMushroom.png",
    isAnimated: false,
    sheet: {
      width: 16,
      height: 16,
    },
    noCollision: true,
  },
  {
    id: "secret_path_red_mushroom",
    x: 315,
    y: 447.5,
    spritesheet: "assets/objects/SmallRedMushroom.png",
    isAnimated: false,
    sheet: {
      width: 16,
      height: 16,
    },
    noCollision: true,
    interactable: true,
    onClick: () => {
      questModalManager.open("SecretPath");
    },
  },
  {
    id: "arcadian_mechanism",
    x: 780,
    y: 350,
    spritesheet: "assets/objects/ArcadianMechanism.png",
    isAnimated: true,
    idle: true,
    sheet: {
      width: 55,
      height: 97,
      frames: {
        start: 0,
        end: 54,
        rate: 10,
      },
      loop: false,
    },
    noCollision: true,
  },
  {
    id: "arcadian_mechanism_cloud",
    x: 780,
    y: 383,
    spritesheet: "assets/objects/Cloud.png",
    isAnimated: false,
    sheet: {
      width: 48,
      height: 48,
    },
    noCollision: true,
    hideByDefault: true,
  },
  {
    id: "end_quest_chest",
    x: 583.5,
    y: 102,
    spritesheet: "assets/objects/OpenMeChest.png",
    isAnimated: true,
    idle: true,
    sheet: {
      width: 19,
      height: 18,
      frames: {
        start: 0,
        end: 29,
        rate: 10,
      },
      loop: true,
    },
    noCollision: true,
    interactable: true,
    onClick: () => {
      eventManager.emit("playCutscene", true);
    },
  },
  {
    id: "end_quest_cart",
    x: 615,
    y: 83,
    spritesheet: "assets/objects/Cart.png",
    isAnimated: false,
    sheet: {
      width: 16,
      height: 18,
    },
    noCollision: true,
    interactable: true,
    onClick: () => {
      eventManager.emit("backToSpawn");
    },
  },
  {
    id: "end_quest_cart_arrow",
    x: 615,
    y: 65,
    spritesheet: "assets/icons/FloatingArrow.png",
    isAnimated: true,
    sheet: {
      width: 13,
      height: 24,
      frames: {
        start: 0,
        end: 16,
        rate: 10,
      },
      loop: true,
    },
    noCollision: true,
    hideByDefault: true,
  },

  // ----------------------------------- MAP Animations -----------------------------------

  {
    id: "waterfall",
    x: 568,
    y: 400,
    spritesheet: "assets/objects/WaterFall.png",
    isAnimated: true,
    sheet: {
      width: 112,
      height: 64,
      frames: {
        start: 0,
        end: 9,
        rate: 10,
      },
      loop: true,
    },
    noCollision: true,
  },
];
