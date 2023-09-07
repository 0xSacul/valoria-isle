import { questModalManager } from "./Components/QuestModal";

export type CustomNPC = {
  id: string;
  x: number;
  y: number;
  name?: string;
  isAnimated: boolean;
  spitesheet: string;
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
    x: 630,
    y: 480,
    name: "VP",
    isAnimated: true,
    spitesheet: "npc/VP.png",
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
    spitesheet: "npc/Tiff.png",
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
    x: 600,
    y: 480,
    name: "Shykun",
    isAnimated: true,
    spitesheet: "npc/Shykun.png",
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
    x: 565,
    y: 480,
    name: "Paluras",
    isAnimated: true,
    spitesheet: "npc/Paluras.png",
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
    x: 810,
    y: 500,
    name: "Dee",
    isAnimated: true,
    spitesheet: "npc/Dee.png",
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
    x: 830,
    y: 500,
    name: "Ded",
    isAnimated: true,
    spitesheet: "npc/Ded.png",
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
    x: 600,
    y: 760,
    name: "Sacul",
    isAnimated: true,
    spitesheet: "npc/Sacul.png",
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

  // ===================== CUSTOM NPCS =====================

  {
    id: "granty",
    x: 790,
    y: 500,
    name: "GranTY",
    isAnimated: true,
    spitesheet: "npc/Granty.png",
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
    },
  },
  {
    id: "cloud",
    x: 850,
    y: 500,
    name: "Cloud",
    isAnimated: true,
    spitesheet: "npc/Cloud.png",
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
    },
  },
  {
    id: "boden",
    x: 540,
    y: 760,
    name: "Boden",
    isAnimated: true,
    spitesheet: "npc/Boden.png",
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
          text: "Howdy farmer, I'm Boden! I'm an artist at Project Dignity. Welcome to our Island fellow farmer!",
        },
        {
          text: "This Island is pretty big, would you like to have a quick look around? Or you can also come and check us out!",
          actions: [
            {
              text: "Sure! Show me around!",
              cb: () => {
                window.CurrentScene.DiscoverIsland();
              },
            },
            {
              text: "Visit Project Dignity",
              cb: () => {
                window.open("https://dignity-games.com/", "_blank");
                window.closeModal();
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: "aeon",
    x: 890,
    y: 500,
    name: "Aeon",
    isAnimated: true,
    spitesheet: "npc/Aeon.png",
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
    },
  },

  // ===================== CUSTOM NON-NPCS =====================

  {
    id: "seal",
    x: 680,
    y: 820,
    isAnimated: true,
    spitesheet: "seal_sprite.png",
    sheet: {
      frames: {
        start: 0,
        end: 19,
        rate: 10,
      },
      width: 32,
      height: 32,
    },
  },
  {
    id: "boat",
    x: 520,
    y: 840,
    spitesheet: "boat.png",
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
  },
  {
    id: "boat_smoke",
    x: 480,
    y: 810,
    spitesheet: "boat_smoke.png",
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
  },
];
