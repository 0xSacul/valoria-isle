import { questModalManager } from "../Components/QuestModal";

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
];
