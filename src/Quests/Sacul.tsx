import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../Components/SpeakingModal";
import { CommunityAPI } from "../Scene";

interface Props {
  onClose: () => void;
}
export const QuestSacul: React.FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState<number>(0);

  const playerWardrobe = CommunityAPI.game.wardrobe;

  useEffect(() => {
    const PDLocalStorage = JSON.parse(
      localStorage.getItem("projectdignity.quest") || "{}"
    );

    if (PDLocalStorage.sacul === "found") setStep(1);

    const hasItem = playerWardrobe["Project Dignity Hoodie"] ? true : true;

    if (hasItem && PDLocalStorage.sacul !== "found") {
      setStep(2);
      PDLocalStorage.sacul = "found";
      localStorage.setItem(
        "projectdignity.quest",
        JSON.stringify(PDLocalStorage)
      );
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
              text: "Sssshhhhh! I'm hiding from the travelers!",
            },
            {
              text: "... Ah crap, you're one of them aren't you?",
            },
            {
              text: "Well, I guess you won't tell anyone if I give you this...",
              actions: [
                {
                  text: "Accept what he's giving you",
                  cb: () => {
                    setStep(1);
                    updatePDLocalStorage("sacul", "found");
                    onClose();
                  },
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
              text: "Hey sir, you already found me!",
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
              text: "Sssshhhhh! I'm hiding from the travelers!",
            },
            {
              text: "... Ah crap, you're one of them aren't you?",
            },
            {
              text: "Well, I guess you won't tell anyone if I give you this... Ah no wait, it seems that you already have one of these. Well, I hope you like good and bad news at the same time, because I have some of that for you.",
            },
            {
              text: "The good news is that you found me, congratulations! The bad news is that I'm not giving you anything else, sorry!",
            },
          ]}
        />
      )}
    </>
  );
};
