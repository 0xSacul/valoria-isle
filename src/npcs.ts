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
};

export const CustomNPCs: CustomNPC[] = [
  {
    id: "vp",
    x: 690,
    y: 500,
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
    id: "tiff",
    x: 520,
    y: 740,
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
    id: "shykun",
    x: 730,
    y: 500,
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
    id: "sacul",
    x: 750,
    y: 500,
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
    id: "paluras",
    x: 770,
    y: 500,
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
    x: 870,
    y: 500,
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
    x: 520,
    y: 840,
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
