import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { CommunityAPI } from "../../Scene";
import { notificationManager } from "../../Components/Notification";
import { questModalManager } from "../../Components/QuestModal";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestLysari: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);
  const [canBurn, setCanBurn] = useState<boolean>(false);

  const playerInventory = CommunityAPI.game.inventory;

  useEffect(() => {
    questModalManager.preventClose(false);
    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.tiff !== "done") {
      setStep(0.1);
      return;
    }

    if (player_quests.lysari === "waiting") setStep(2);
    if (player_quests.lysari === "done") setStep(3.1);

    const wood = Number(playerInventory["Wood"] || 0);
    const iron = Number(playerInventory["Iron"] || 0);

    if (wood >= 50 && iron >= 3) {
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
            lysari: {
              done_at: Date.now(),
            },
          },
        }),
        items: {
          Wood: 50,
          Iron: 3,
        },
      });
      scene.sendQuestUpdate("season_1", "lysari", "done");
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
              text: "Greetings, envoy. Lysari ships are in dire need of repair. Could you collect 50 pieces of wood and 3 pieces of iron for us? In return, we'll give you a Nautical Gear component for the Arcadian Mechanism.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(1);
                    scene.sendQuestUpdate("season_1", "lysari", "waiting");
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
              text: "Great! Return when you have my wood and iron.",
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
              text: "Ah, you're back! Do you have the wood and iron?",
              requirements: [
                {
                  label: "Wood",
                  value: 50,
                  has: Number(playerInventory["Wood"] || 0) >= 50,
                },
                {
                  label: "Iron",
                  value: 3,
                  has: Number(playerInventory["Iron"] || 0) >= 3,
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
              description: "You've completed the Lysari Quest!",
              icon: "Success",
            });
            onClose();
          }}
          message={[
            {
              text: "Thank you for the wood and iron. Here is your Nautical Gear.",
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
              text: "Thank you again for the wood and iron. Hope you enjoy your Nautical Gear!",
            },
          ]}
        />
      )}
    </>
  );
};
