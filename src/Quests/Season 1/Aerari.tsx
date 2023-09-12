import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { CommunityAPI } from "../../Scene";
import { notificationManager } from "../../Components/Notification";
import { questModalManager } from "../../Components/QuestModal";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestAerari: React.FC<Props> = ({ onClose, scene }) => {
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

    if (player_quests.aerari === "waiting") setStep(2);
    if (player_quests.aerari === "done") setStep(3.1);

    const blueberries = Number(playerInventory["Blueberry"] || 0);

    if (blueberries >= 20) {
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
            aerari: {
              done_at: Date.now(),
            },
          },
        }),
        items: {
          Blueberry: 20,
        },
      });
      scene.sendQuestUpdate("season_1", "aerari", "done");
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
              text: "Welcome, envoy. The Aerai scholars require blueberries for their arcane studies. Could you collect 20 blueberries for us? In return, we'll grant you a Magical Rune component for the Arcadian Mechanism.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(1);
                    scene.sendQuestUpdate("season_1", "aerari", "waiting");
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
              text: "Great! Return when you have my blueberries.",
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
              text: "Ah, you're back! Do you have the blueberries?",
              requirements: [
                {
                  label: "Blueberry",
                  value: 20,
                  has: Number(playerInventory["Blueberry"] || 0) >= 20,
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
              description: "You've completed the Aerari Quest!",
              icon: "Success",
            });
            onClose();
          }}
          message={[
            {
              text: "Thank you for the blueberries. Here is your Magical Rune component.",
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
              text: "Thank you again for the blueberries. Hope you enjoy your Magical Rune!",
            },
          ]}
        />
      )}
    </>
  );
};
