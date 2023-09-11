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

type CommunityToasts = {
  text: string;
  item?: string;
};

export type CommunityModals = {
  type: "speaking" | "loading";
  messages?: {
    text: string;
    actions?: { text: string; cb: () => void }[];
  }[];
};

export type DatabaseData = {
  farmId: number;
  visitCount: number;
  wallet: string;
  farm: string;
  canAccess: boolean;
  quests: {
    season_1: {
      sacul?: string;
      tiff?: string;
      secret_path?: string;
      pyrari?: string;
      lysari?: string;
      veyari?: string;
      final?: string;
    };
  };
  assets: Array<any>;
};

type CommunityAPICallRecord = Record<string, number>;

interface CommunityAPICall {
  metadata: string;
  wearables?: CommunityAPICallRecord;
  items?: CommunityAPICallRecord;
}

interface CommunityAPI {
  mint: (mint: CommunityAPICall) => Promise<void>;
  burn: (burn: CommunityAPICall) => Promise<void>;
  game: {
    inventory: Partial<Record<string, number>>;
    wardrobe: Partial<Record<string, number>>;
  };
  user: {
    farmId: number;
  };
}

interface CommunityAPIConstructor {
  new (config: { id: string; apiKey: string }): CommunityAPI;
}

declare global {
  interface Window {
    BaseScene: any;
    createToast: (toast: CommunityToasts) => void;
    openModal: (modal: CommunityModals) => void;
    closeModal: () => void;
    CommunityAPI: CommunityAPIConstructor;
    ExternalScene: typeof ExternalScene;
  }
}
