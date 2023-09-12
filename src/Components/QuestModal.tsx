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
import { QuestAerari } from "../Quests/Season 1/Aerari";

class QuestModalManager {
  private listener?: (npc: QuestNPCName, isOpen: boolean) => void;
  private preventCloseListener?: (value: boolean) => void;

  public open(npc: QuestNPCName) {
    if (this.listener) {
      this.listener(npc, true);
    }
  }

  public listen(cb: (npc: QuestNPCName, isOpen: boolean) => void) {
    this.listener = cb;
  }

  public preventClose(value: boolean) {
    if (this.preventCloseListener) {
      this.preventCloseListener(value);
    }
  }

  public listenPreventClose(cb: (value: boolean) => void) {
    this.preventCloseListener = cb;
  }
}

export const questModalManager = new QuestModalManager();

type Props = {
  scene: any;
};

export const QuestModal: React.FC<Props> = ({ scene }) => {
  const [npc, setNpc] = useState<QuestNPCName>();
  const [preventClose, setPreventClose] = useState<boolean>(false);

  useEffect(() => {
    questModalManager.listen((npc) => {
      setPreventClose(false);
      setNpc(npc);
    });

    questModalManager.listenPreventClose((value) => {
      setPreventClose(value);
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
        {npc === "Ded" && <QuestAerari scene={scene} onClose={closeModal} />}
      </Modal>
    </>
  );
};
