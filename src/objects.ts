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
};

export const CustomObjects: CustomObject[] = [
  {
    id: "seal",
    x: 680,
    y: 820,
    isAnimated: true,
    spritesheet: "seal_sprite.png",
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
    spritesheet: "boat.png",
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
    spritesheet: "boat_smoke.png",
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
  {
    id: "secret_path_tree_1",
    x: 280,
    y: 483,
    spritesheet: "medium-tree.png",
    isAnimated: false,
    sheet: {
      width: 18,
      height: 35,
    },
  },
  {
    id: "secret_path_tree_2",
    x: 310,
    y: 483,
    spritesheet: "medium-tree.png",
    isAnimated: false,
    sheet: {
      width: 18,
      height: 35,
    },
  },
];
