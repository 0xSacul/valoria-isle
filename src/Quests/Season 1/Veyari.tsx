import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { CommunityAPI } from "../../Scene";
import { notificationManager } from "../../Components/Notification";
import { questModalManager } from "../../Components/QuestModal";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestVeyari: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);
  const [canBurn, setCanBurn] = useState<boolean>(false);

  const playerInventory = CommunityAPI.game.inventory;

  useEffect(() => {
    questModalManager.preventClose(false);
    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.tiff !== "done") {
      setStep(0.1);
      return;
    } else {
      setStep(0);
    }

    if (player_quests.veyari === "waiting") setStep(2);
    if (player_quests.veyari === "done") setStep(3.1);

    const kale = Number(playerInventory["Kale"] || 0);
    const mushrooms = Number(playerInventory["Wild Mushroom"] || 0);

    if (kale >= 30 && mushrooms >= 5) {
      setCanBurn(true);
    }
  }, []);

  const handleQuestComplete = async () => {
    setStep(2.1);

    try {
      questModalManager.preventClose(true);
      await CommunityAPI.burn({
        metadata: JSON.stringify({
          quests: {
            veyari: {
              done_at: Date.now(),
            },
          },
        }),
        items: {
          Kale: 30,
          "Wild Mushroom": 5,
        },
      });
      scene.sendQuestUpdate("season_1", "veyari", "done");
      setStep(3);
    } catch (e) {
      console.error(e);
      setStep(2.2);
    }
  };

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
              text: "Welcome, envoy. The Veyari tribe needs kale and mushrooms for medicine. Could you collect 30 kale and 5 mushrooms for us? We'll reward you with a Forest Gem component for the Arcadian Mechanism.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(1);
                    scene.sendQuestUpdate("season_1", "veyari", "waiting");
                  },
                },
                {
                  text: "Maybe later.",
                  cb: () => onClose(),
                },
              ],
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
              text: "Great! Return when you have my kale and mushrooms.",
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
              text: "Ah, you're back! Do you have the kale and mushrooms?",
              requirements: [
                {
                  label: "Kale",
                  value: 30,
                  has: Number(playerInventory["Kale"] || 0) >= 30,
                },
                {
                  label: "Mushroom",
                  value: 5,
                  has: Number(playerInventory["Wild Mushroom"] || 0) >= 5,
                },
              ],
              actions: [
                {
                  text: "Yes, here you go.",
                  cb: () => handleQuestComplete(),
                  disabled: !canBurn,
                },
                {
                  text: "I'm still working on it.",
                  cb: () => onClose(),
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
              text: "Let me see what you have...",
            },
          ]}
        />
      )}
      {step === 2.2 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Ah... Something's wrong with the resources you gave me. Try again later.",
            },
          ]}
        />
      )}
      {step === 3 && (
        <SpeakingModal
          onClose={() => {
            notificationManager.notification({
              title: "Congratulations!",
              description: "You've completed the Veyari Quest!",
              icon: "Success",
            });
            onClose();
          }}
          message={[
            {
              text: "Thank you for the kale and mushrooms. Here is your Forest Gem.",
            },
          ]}
        />
      )}
      {step === 3.1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Thank you again for the kale and mushrooms. Hope you enjoy your Forest Gem!",
            },
          ]}
        />
      )}
    </>
  );
};
