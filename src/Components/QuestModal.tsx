import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { QuestNPCName } from "./lib/npc";

// Quests
import { QuestSacul } from "../Quests/Season 1/Sacul";
import { QuestTiff } from "../Quests/Season 1/Tiff";
import { QuestLysari } from "../Quests/Season 1/Lysari";
import { QuestVeyari } from "../Quests/Season 1/Veyari";
import { QuestPyrari } from "../Quests/Season 1/Pyrari";
import { QuestSecretPath } from "../Quests/Season 1/SecretPath";
import { QuestFinal } from "../Quests/Season 1/EndQuest";

class QuestModalManager {
  private listener?: (npc: QuestNPCName, isOpen: boolean) => void;
  public preventClose: boolean = false;

  public open(npc: QuestNPCName) {
    if (!this.preventClose && this.listener) {
      this.listener(npc, true);
    }
  }

  public listen(cb: (npc: QuestNPCName, isOpen: boolean) => void) {
    this.listener = cb;
  }

  public setPreventClose(value: boolean) {
    this.preventClose = value;
  }
}

export const questModalManager = new QuestModalManager();

type Props = {
  scene: any;
};

export const QuestModal: React.FC<Props> = ({ scene }) => {
  const [npc, setNpc] = useState<QuestNPCName>();
  const [preventClose, setPreventClose] = useState<boolean>(
    questModalManager.preventClose
  );

  useEffect(() => {
    questModalManager.listen((npc) => {
      setNpc(npc);
      setPreventClose(questModalManager.preventClose);
    });
  }, []);

  const closeModal = () => {
    setNpc(undefined);
  };

  return (
    <>
      <Modal
        show={!!npc}
        centered
        onHide={closeModal}
        backdrop={preventClose ? "static" : true}
      >
        {npc === "Sacul" && <QuestSacul scene={scene} onClose={closeModal} />}
        {npc === "Tiff" && <QuestTiff scene={scene} onClose={closeModal} />}
        {npc === "Paluras" && (
          <QuestLysari scene={scene} onClose={closeModal} />
        )}
        {npc === "Shykun" && <QuestVeyari scene={scene} onClose={closeModal} />}
        {npc === "VP" && <QuestPyrari scene={scene} onClose={closeModal} />}
        {npc === "SecretPath" && (
          <QuestSecretPath scene={scene} onClose={closeModal} />
        )}
        {npc === "Dee" && <QuestFinal scene={scene} onClose={closeModal} />}
      </Modal>
    </>
  );
};
