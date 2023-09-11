import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { notificationManager } from "../../Components/Notification";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestSacul: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.tiff !== "done") setStep(0.1);
    if (scene.hoodieLeft <= 0) setStep(0.2);
    if (player_quests.sacul === "found") setStep(1);
    if (player_quests.sacul === "owns") setStep(2);
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
                    scene.updateRemainingHoodies(true);
                    scene.sendQuestUpdate("season_1", "sacul", "found");
                    notificationManager.notification({
                      title: "Congratulations!",
                      description:
                        "You've found an exclusive Project Dignity hoodie!",
                      icon: "ProjectDignityHoodie",
                    });
                    onClose();
                  },
                },
              ],
            },
          ]}
        />
      )}
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
      {step === 0.2 && (
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
              text: "Lots of you have been coming here lately, I'm not sure why. Unfortunately I don't have anything for you, but I'm sure you'll find something useful elsewhere.",
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
