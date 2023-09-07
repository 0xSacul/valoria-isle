import { QuestNPCName } from "./lib/npc";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

// Quests
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

export const QuestModal: React.FC = () => {
  const [npc, setNpc] = useState<QuestNPCName>();

  useEffect(() => {
    questModalManager.listen((npc, open) => {
      setNpc(npc);
      console.log("open", npc, open);
    });
  }, []);

  const closeModal = () => {
    setNpc(undefined);
  };

  return (
    <>
      <Modal show={!!npc} centered onHide={closeModal}>
        {npc === "Tiff" && <QuestTiff onClose={closeModal} />}
        {npc === "Paluras" && <QuestLysari onClose={closeModal} />}
        {npc === "Shykun" && <QuestVeyari onClose={closeModal} />}
        {npc === "VP" && <QuestPyrari onClose={closeModal} />}
      </Modal>
    </>
  );
};
