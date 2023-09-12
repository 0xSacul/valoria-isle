import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { notificationManager } from "../../Components/Notification";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestSecretPath: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.tiff !== "done") {
      return onClose();
    }

    if (
      player_quests.secret_path === "found" ||
      player_quests.secret_path === "done"
    ) {
      return onClose();
    }

    scene.PlaySound("secret_path_discovery");
  }, []);

  return (
    <>
      {step === 0 && (
        <SpeakingModal
          trail={80}
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Ah, you've found the enchanted mushroom. Very few outsiders have ever managed to do so. Are you ready to see the unseen?",
              actions: [
                {
                  text: "Yes, show me the way",
                  cb: () => {
                    setStep(1);
                  },
                },
                {
                  text: "No, I'll come back later",
                  cb: () => {
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
          trail={80}
          onClose={() => {
            notificationManager.notification({
              title: "Congratulations!",
              description: "You've found the secret path!",
              icon: "Success",
            });
            scene.sendQuestUpdate("season_1", "secret_path", "found");
            onClose();
          }}
          onTextChange={(text) => {
            if (text === "Very well. Witness the magic of the Aerari.") {
              scene.PlaySound("secret_path_discovery_2");
            } else if (
              text ===
              "Follow the path, but tread carefully. You are entering the sacred lands of the Aerari, scholars and mages of ancient wisdom."
            ) {
              scene.PlaySound("secret_path_discovery_3");
            }
          }}
          message={[
            {
              text: "Very well. Witness the magic of the Aerari.",
            },
            {
              text: "Follow the path, but tread carefully. You are entering the sacred lands of the Aerari, scholars and mages of ancient wisdom.",
            },
          ]}
        />
      )}
    </>
  );
};
