import { questModalManager } from "../Components/QuestModal";
import { uiManager } from "../UI";

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
  };
  isAnimated: boolean;
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
          text: "This is a community project, made by the community for the community.",
        },
        {
          text: "Here at Project Dignity, we really wanted to create something that would be fun for everyone, and that would be a great way to introduce new players to the game.",
        },
        {
          text: "The Island is a great place to start your adventure, and we hope you'll enjoy it! And don't forget to walk around and talk to people, you might find some interesting quests!",
        },
        {
          text: "You'll also see that in our Island we keep some kind of roleplay, so don't take this sign as a part of our lore, it's just a way to introduce you to the Island!",
        },
        {
          text: "Also, a huuuuge shoutout to the amazing team that worked on this project,",
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
    id: "secret_path_tree_1",
    x: 280,
    y: 483,
    spritesheet: "assets/objects/MediumTree.png",
    isAnimated: false,
    sheet: {
      width: 18,
      height: 35,
    },
    noCollision: true,
  },
  {
    id: "secret_path_tree_2",
    x: 310,
    y: 483,
    spritesheet: "assets/objects/MediumTree.png",
    isAnimated: false,
    sheet: {
      width: 18,
      height: 35,
    },
    noCollision: true,
  },

  // Sparkle Trees

  {
    hideByDefault: true,
    id: "secret_path_sparklestree1",
    x: 280,
    y: 483,
    spritesheet: "assets/objects/TreeSparkle.png",
    isAnimated: true,
    sheet: {
      width: 46,
      height: 49,
      frames: {
        start: 0,
        end: 17,
        rate: 10,
      },
    },
    noCollision: true,
  },
  {
    hideByDefault: true,
    id: "secret_path_sparklestree2",
    x: 310,
    y: 483,
    spritesheet: "assets/objects/TreeSparkle.png",
    isAnimated: true,
    sheet: {
      width: 46,
      height: 49,
      frames: {
        start: 0,
        end: 17,
        rate: 10,
      },
    },
    noCollision: true,
  },

  // Fade Away Trees

  {
    hideByDefault: true,
    id: "secret_path_fadeawaytree1",
    x: 280,
    y: 483,
    spritesheet: "assets/objects/TreeFadeAway.png",
    isAnimated: true,
    sheet: {
      width: 46,
      height: 49,
      frames: {
        start: 0,
        end: 76,
        rate: 10,
      },
    },
    noCollision: true,
  },

  {
    hideByDefault: true,
    id: "secret_path_fadeawaytree2",
    x: 310,
    y: 483,
    spritesheet: "assets/objects/TreeFadeAway.png",
    isAnimated: true,
    sheet: {
      width: 46,
      height: 49,
      frames: {
        start: 0,
        end: 76,
        rate: 10,
      },
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
    x: 330,
    y: 485,
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
    isAnimated: false,
    sheet: {
      width: 32,
      height: 34,
    },
    noCollision: true,
    interactable: true,
    onClick: () => {
      console.log("Arcadian Mechanism");
    },
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
    },
    noCollision: true,
  },
];
