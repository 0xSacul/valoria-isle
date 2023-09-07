import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { QuestNPCName } from "./lib/npc";

// Quests
import { QuestSacul } from "../Quests/Sacul";
import { QuestTiff } from "../Quests/Tiff";
import { QuestLysari } from "../Quests/Lysari";
import { QuestVeyari } from "../Quests/Veyari";
import { QuestPyrari } from "../Quests/Pyrari";

class QuestModalManager {
  private listener?: (npc: QuestNPCName, isOpen: boolean) => void;

  public open(npc: QuestNPCName) {
    if (this.listener) {
      this.listener(npc, true);
    }
  }

  public listen(cb: (npc: QuestNPCName, isOpen: boolean) => void) {
    this.listener = cb;
  }
}

export const questModalManager = new QuestModalManager();

type Props = {
  scene: any;
};

export const QuestModal: React.FC<Props> = ({ scene }) => {
  const [npc, setNpc] = useState<QuestNPCName>();

  useEffect(() => {
    questModalManager.listen((npc) => {
      setNpc(npc);
    });
  }, []);

  const closeModal = () => {
    setNpc(undefined);
  };

  return (
    <>
      <Modal show={!!npc} centered onHide={closeModal}>
        {npc === "Sacul" && <QuestSacul scene={scene} onClose={closeModal} />}
        {npc === "Tiff" && <QuestTiff scene={scene} onClose={closeModal} />}
        {npc === "Paluras" && (
          <QuestLysari scene={scene} onClose={closeModal} />
        )}
        {npc === "Shykun" && <QuestVeyari scene={scene} onClose={closeModal} />}
        {npc === "VP" && <QuestPyrari scene={scene} onClose={closeModal} />}
      </Modal>
    </>
  );
};
