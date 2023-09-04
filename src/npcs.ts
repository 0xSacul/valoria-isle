export type CustomNPC = {
  x: number;
  y: number;
  name?: string;
  spitesheet: string;
  sheet: {
    frames: {
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
    x: 690,
    y: 500,
    name: "VP",
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
    x: 710,
    y: 500,
    name: "Tiff",
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
    x: 730,
    y: 500,
    name: "Shykun",
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
    x: 750,
    y: 500,
    name: "Sacul",
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
    x: 770,
    y: 500,
    name: "Paluras",
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
    x: 790,
    y: 500,
    name: "GranTY",
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
    x: 810,
    y: 500,
    name: "Dee",
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
    x: 830,
    y: 500,
    name: "Ded",
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
    x: 850,
    y: 500,
    name: "Cloud",
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
    x: 870,
    y: 500,
    name: "Boden",
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
    x: 890,
    y: 500,
    name: "Aeon",
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
    x: 825,
    y: 650,
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
];
