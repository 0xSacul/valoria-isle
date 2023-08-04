import ExternalScene from "./Scene";

export interface Clothing {
  body: string;
  hat?: string;
  hair: string;
  shirt: string;
  pants: string;
  tool?: string;
}

export const DefaultNPC: Clothing = {
  body: "Goblin Potion",
  hat: "Sleeping Otter",
  hair: "Buzz Cut",
  shirt: "SFL T-Shirt",
  pants: "Farmer Pants",
  tool: "Pirate Scimitar",
};

export const TiffNPC: Clothing = {
  body: "Beige Farmer Potion",
  hat: "Sleeping Otter",
  hair: "Blondie",
  shirt: "Project Dignity Hoodie",
  pants: "Farmer Pants",
  tool: "Dawn Lamp",
};

declare global {
  interface Window {
    BaseScene: any;
    openModal: any;
    ExternalScene: typeof ExternalScene;
  }
}
