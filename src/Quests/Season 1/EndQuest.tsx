import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestFinal: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);
  const [canCompleteQuest, setCanCompleteQuest] = useState<boolean>(false);

  useEffect(() => {
    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.tiff !== "done") {
      setStep(0.1);
      return;
    }

    if (player_quests.final !== "done") {
      setStep(0);
    } else {
      setStep(2.1);
    }

    if (
      player_quests.lysari === "done" &&
      player_quests.veyari === "done" &&
      player_quests.pyrari === "done" &&
      player_quests.aerari === "done"
    ) {
      setCanCompleteQuest(true);
    }
  }, []);

  return (
    <>
      {step === 0.1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Greetings.. Wait who are you? Tiff usually tells me when we're expecting someone, maybe you should go talk to her first.",
            },
          ]}
        />
      )}
      {step === 0 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Greetings, traveler. I am Envoy Dee, a special envoy from the Arcadian Reclaim. You see this intricate mechanism beside me? It's an ancient device that we believe is connected to the island's relic. I've been waiting for someone like you, someone who can unite the tribes and help us complete this mechanism. Have you completed the tasks for the four tribes?",
              actions: [
                {
                  text: "Yes, I have gained the trust of all four tribes.",
                  cb: () => {
                    setStep(1);
                  },
                },
                {
                  text: "No, I'm still working on it.",
                  cb: () => {
                    setStep(0.2);
                  },
                },
              ],
            },
          ]}
        />
      )}
      {step === 0.2 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "The path to unity is a long one. Return when you have gained the trust of all four tribes.",
            },
          ]}
        />
      )}
      {step === 0.3 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "I see. Return when you have all the components. We can't complete the Arcadian Mechanism without them.",
            },
          ]}
        />
      )}
      {step === 1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Excellent. I must admit, I don't know what this mechanism does, but it's missing four key components. Each tribe holds one. Are you ready to assemble the Arcadian Mechanism and perhaps discover its purpose?",
              actions: [
                {
                  text: "Yes, I have all the components.",
                  cb: () => {
                    setStep(2);
                  },
                },
                {
                  text: "No, I'm still working on it.",
                  cb: () => {
                    setStep(0.3);
                  },
                },
              ],
            },
          ]}
        />
      )}
      {step === 2 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Place the Lysari Component, the Veyari Component, the Pyrari Component, and the Aerari Component into the slots on the mechanism",
              actions: [
                {
                  text: "Place the components",
                  disabled: !canCompleteQuest,
                  cb: () => {
                    scene.Season1EndQuestAnimation();
                    onClose();
                  },
                },
              ],
            },
          ]}
        />
      )}
      {step === 2.1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Traveler! I'll be forever thankful for your help. Trust me, I will never forget what you've done for us.",
            },
          ]}
        />
      )}
    </>
  );
};
