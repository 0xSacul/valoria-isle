import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestSacul: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const player_quests = scene.currentPlayer.db_data.quests || {};

    if (player_quests.sacul === "found") setStep(1);
    if (player_quests.sacul === "onws") {
      setStep(2);
      scene.sendQuestUpdate("sacul", "found");
    }
  }, []);

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
                    scene.sendQuestUpdate("sacul", "found");
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
