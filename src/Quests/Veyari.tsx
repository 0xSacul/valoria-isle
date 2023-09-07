import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../Components/SpeakingModal";
import { CommunityAPI } from "../Scene";

interface Props {
  onClose: () => void;
}
export const QuestVeyari: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0);
  const [canBurn, setCanBurn] = useState<boolean>(false);

  const playerInventory = CommunityAPI.game.inventory;

  useEffect(() => {
    const PDLocalStorage = JSON.parse(
      localStorage.getItem("projectdignity.quest") || "{}"
    );
    if (PDLocalStorage.veyari === "waiting") setStep(2);
    if (PDLocalStorage.veyari === "done") setStep(3.1);

    const kale = Number(playerInventory["Kale"] || 0);
    const mushrooms = Number(playerInventory["Mushrooms"] || 0);

    if (kale >= 30 && mushrooms >= 5) {
      setCanBurn(true);
    }
  }, []);

  const updatePDLocalStorage = (npc: string, status: string) => {
    const PDLocalStorage = JSON.parse(
      localStorage.getItem("projectdignity.quest") || "{}"
    );

    PDLocalStorage[npc] = status;
    localStorage.setItem(
      "projectdignity.quest",
      JSON.stringify(PDLocalStorage)
    );
  };

  return (
    <>
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
                    updatePDLocalStorage("veyari", "waiting");
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
                  label: "Mushrooms",
                  value: 5,
                  has: Number(playerInventory["Mushrooms"] || 0) >= 5,
                },
              ],
              actions: [
                {
                  text: "Yes, here you go.",
                  cb: () => console.log("TODO"),
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
      {step === 3 && (
        <SpeakingModal
          onClose={() => {
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
