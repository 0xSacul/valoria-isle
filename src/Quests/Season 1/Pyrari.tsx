import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { CommunityAPI } from "../../Scene";
import { notificationManager } from "../../Components/Notification";
import { questModalManager } from "../../Components/QuestModal";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestPyrari: React.FC<Props> = ({ onClose, scene }) => {
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

    if (player_quests.pyrari === "waiting") setStep(2);
    if (player_quests.pyrari === "done") setStep(3.1);

    const iron = Number(playerInventory["Iron"] || 0);
    const stone = Number(playerInventory["Stone"] || 0);

    if (iron >= 15 && stone >= 50) {
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
            pyrari: {
              done_at: Date.now(),
            },
          },
        }),
        items: {
          Iron: 15,
          Stone: 50,
        },
      });
      scene.sendQuestUpdate("season_1", "pyrari", "done");
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
              text: "Ah, an envoy! The Pyrari need iron and stone for their crafts. Could you mine 15 pieces of iron and 50 pieces of stone? In exchange, we'll give you a Star Metal Cog component for the Arcadian Mechanism.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(1);
                    scene.sendQuestUpdate("season_1", "pyrari", "waiting");
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
              text: "Great! Return when you have my iron and stone.",
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
              text: "Ah, you're back! Do you have the iron and stone?",
              requirements: [
                {
                  label: "Iron",
                  value: 15,
                  has: Number(playerInventory["Iron"] || 0) >= 15,
                },
                {
                  label: "Stone",
                  value: 50,
                  has: Number(playerInventory["Stone"] || 0) >= 50,
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
            onClose();
            notificationManager.notification({
              title: "Congratulations!",
              description: "You've completed the Pyrari Quest!",
              icon: "Success",
            });
          }}
          message={[
            {
              text: "Thank you for the iron and stone. Here is your Star Metal Cog.",
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
              text: "Thank you again for the iron and stone. Hope you enjoy your Star Metal Cog!",
            },
          ]}
        />
      )}
    </>
  );
};
