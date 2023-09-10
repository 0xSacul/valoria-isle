import React, { useEffect, useState } from "react";

import { QuestModal } from "./Components/QuestModal";
import { CutScene } from "./Components/CutScene";
import { LostConnection } from "./Components/LostConnection";
import { Notifications, notificationManager } from "./Components/Notification";
import { Dialogue } from "./Components/Dialogue";

class UIManager {
  private listener?: (playCutscene: boolean) => void;
  private lostConnectionListener?: () => void;
  private backToSpawnListener?: () => void;
  private dialogueListener?: (message: string, closeAfter?: number) => void;

  public playCutscene() {
    if (this.listener) {
      this.listener(true);
    }
  }

  public listen(cb: (playCutscene: boolean) => void) {
    this.listener = cb;
  }

  public stopCutscene() {
    if (this.listener) {
      this.listener(false);
    }
  }

  public onLostConnection(cb: () => void) {
    this.lostConnectionListener = cb;
  }

  public lostConnection() {
    if (this.lostConnectionListener) {
      this.lostConnectionListener();
    }
  }

  public onBackToSpawn(cb: () => void) {
    this.backToSpawnListener = cb;
  }

  public backToSpawn() {
    if (this.backToSpawnListener) {
      this.backToSpawnListener();
    }
  }

  public onDialogue(cb: (message: string, closeAfter?: number) => void) {
    this.dialogueListener = cb;
  }

  public dialogue(message: string, closeAfter?: number) {
    if (this.dialogueListener) {
      this.dialogueListener(message, closeAfter);
    }
  }
}

export const uiManager = new UIManager();

type Props = {
  scene: any;
};

export const UI: React.FC<Props> = ({ scene }) => {
  const [playCutscene, setPlayCutscene] = useState<boolean>(false);
  const [lostConnection, setLostConnection] = useState<boolean>(false);
  const [dialogueMessage, setDialogueMessage] = useState<string>("");

  useEffect(() => {
    uiManager.listen((playCutscene) => {
      if (scene.currentPlayer.db_data.quests.season_1.final === "done") return;

      setPlayCutscene(playCutscene);

      if (playCutscene) {
        setTimeout(() => {
          setPlayCutscene(false);

          notificationManager.notification({
            title: "Congratulations!",
            description: "You've achieved the final quest!",
            icon: "Success",
          });

          const floating_arrow = scene.children.getByName(
            "end_quest_cart_arrowObject"
          );
          floating_arrow.setVisible(true);
          floating_arrow.anims.play("end_quest_cart_arrow_anim", true);

          setDialogueMessage(
            "You.. YOU DID IT TRAVELER! You've united the tribes and completed the mechanism! I can't believe it, I've been waiting for this moment for so long. I can't thank you enough, but at least I can help you to get down of there, jump in the cart!"
          );

          scene.sendQuestUpdate("season_1", "final", "done");
        }, 10000);
      }
    });

    uiManager.onLostConnection(() => {
      setLostConnection(true);
    });

    uiManager.onBackToSpawn(() => {
      scene.sendPlayerToSpawn();
    });

    uiManager.onDialogue((message, closeAfter) => {
      setDialogueMessage(message);

      if (closeAfter) {
        setTimeout(() => {
          setDialogueMessage("");
        }, closeAfter);
      }
    });
  }, []);

  return (
    <>
      <QuestModal scene={scene} />
      <Notifications scene={scene} />
      <Dialogue scene={scene} message={dialogueMessage} onClose={() => {}} />
      {playCutscene && <CutScene />}
      {lostConnection && <LostConnection />}
    </>
  );
};
