import { questModalManager } from "../Components/QuestModal";

export type CustomNPC = {
  id: string;
  x: number;
  y: number;
  name?: string;
  isAnimated: boolean;
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
  onClick?: () => void;
};

export const CustomNPCs: CustomNPC[] = [
  // ===================== QUEST NPCS =====================

  {
    id: "vp",
    x: 957,
    y: 73,
    name: "VP",
    isAnimated: true,
    spritesheet: "assets/npc/VP.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("VP");
    },
  },
  {
    id: "tiff",
    x: 530,
    y: 480,
    name: "Tiff",
    isAnimated: true,
    spritesheet: "assets/npc/Tiff.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Tiff");
    },
  },
  {
    id: "shykun",
    x: 67,
    y: 90,
    name: "Shykun",
    isAnimated: true,
    spritesheet: "assets/npc/Shykun.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Shykun");
    },
  },
  {
    id: "paluras",
    x: 1045,
    y: 626,
    name: "Paluras",
    isAnimated: true,
    spritesheet: "assets/npc/Paluras.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Paluras");
    },
  },
  {
    id: "dee",
    x: 755,
    y: 370,
    name: "Dee",
    isAnimated: true,
    spritesheet: "assets/npc/Dee.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Dee");
    },
  },
  {
    id: "ded",
    x: 62,
    y: 618,
    name: "Ded",
    isAnimated: true,
    spritesheet: "assets/npc/Ded.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Ded");
    },
  },
  {
    id: "sacul",
    x: 350,
    y: 590,
    name: "Sacul",
    isAnimated: true,
    spritesheet: "assets/npc/Sacul.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    onClick: () => {
      questModalManager.open("Sacul");
    },
  },

  // ===================== VILLAGERS =======================

  {
    id: "cloud",
    x: 354,
    y: 93,
    name: "Cloud",
    isAnimated: true,
    spritesheet: "assets/npc/Cloud.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Hello, welcome to Veyari !",
        },
      ],
    },
  },
  {
    id: "daan",
    x: 824,
    y: 241,
    name: "Daan",
    isAnimated: true,
    spritesheet: "assets/npc/Daan.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 22,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Hello, welcome to Pyrari !",
        },
      ],
    },
  },
  {
    id: "godlevel",
    x: 949,
    y: 245,
    name: "Godlevel",
    isAnimated: true,
    spritesheet: "assets/npc/Godlevel.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 22,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Hello, welcome to Pyrari !",
        },
      ],
    },
  },
  {
    id: "pedro",
    x: 788,
    y: 720,
    name: "Pedro",
    isAnimated: true,
    spritesheet: "assets/npc/Pedro.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 22,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Hello, welcome to Lysari !",
        },
      ],
    },
  },
  {
    id: "granty",
    x: 880,
    y: 473,
    name: "GranTY",
    isAnimated: true,
    spritesheet: "assets/npc/Granty.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Hello, welcome to Lysari !",
        },
      ],
    },
  },
  {
    id: "boden",
    x: 540,
    y: 760,
    name: "Boden",
    isAnimated: true,
    spritesheet: "assets/npc/Boden.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Howdy unknown traveler, I'm Boden, welcome on our island!",
        },
        {
          text: "I'm just a simple villager, but I think you should go talk to Tiff, so she can announce your arrival to the rest of the island!",
        },
        {
          text: "She's in the village, just follow the path to the north!",
        },
      ],
    },
  },
  {
    id: "aeon",
    x: 328,
    y: 293,
    name: "Aeon",
    isAnimated: true,
    spritesheet: "assets/npc/Aeon.png",
    sheet: {
      frames: {
        start: 0,
        end: 8,
        rate: 10,
      },
      width: 20,
      height: 19,
    },
    modal: {
      type: "speaking",
      messages: [
        {
          text: "Hello, welcome to Veyari !",
        },
      ],
    },
  },
];
