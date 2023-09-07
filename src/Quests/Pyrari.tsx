import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../Components/SpeakingModal";
import { CommunityAPI } from "../Scene";

interface Props {
  onClose: () => void;
}
export const QuestPyrari: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0);
  const [canBurn, setCanBurn] = useState<boolean>(false);

  const playerInventory = CommunityAPI.game.inventory;

  useEffect(() => {
    const PDLocalStorage = JSON.parse(
      localStorage.getItem("projectdignity.quest") || "{}"
    );
    if (PDLocalStorage.pyrari === "waiting") setStep(2);
    if (PDLocalStorage.pyrari === "done") setStep(3.1);

    const iron = Number(playerInventory["Iron"] || 0);
    const stone = Number(playerInventory["Stone"] || 0);

    if (iron >= 15 && stone >= 50) {
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
              text: "Ah, an envoy! The Pyrari need iron and stone for their crafts. Could you mine 15 pieces of iron and 50 pieces of stone? In exchange, we'll give you a Star Metal Cog component for the Arcadian Mechanism.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(1);
                    updatePDLocalStorage("pyrari", "waiting");
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
