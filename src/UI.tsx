import React, { useEffect, useState } from "react";

import { QuestModal } from "./Components/QuestModal";
import { CutScene } from "./Components/CutScene";
import { LostConnection } from "./Components/LostConnection";
import { Notifications } from "./Components/Notification";

class UIManager {
  private listener?: (playCutscene: boolean) => void;
  private lostConnectionListener?: () => void;

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
}

export const uiManager = new UIManager();

type Props = {
  scene: any;
};

export const UI: React.FC<Props> = ({ scene }) => {
  const [playCutscene, setPlayCutscene] = useState<boolean>(false);
  const [lostConnection, setLostConnection] = useState<boolean>(false);

  useEffect(() => {
    uiManager.listen((playCutscene) => {
      setPlayCutscene(playCutscene);

      if (playCutscene) {
        setTimeout(() => {
          setPlayCutscene(false);
        }, 10000);
      }
    });

    uiManager.onLostConnection(() => {
      setLostConnection(true);
    });
  }, []);

  return (
    <>
      <QuestModal scene={scene} />
      <Notifications scene={scene} />
      {playCutscene && <CutScene />}
      {lostConnection && <LostConnection />}
    </>
  );
};
