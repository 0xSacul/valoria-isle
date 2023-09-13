import React, { useEffect, useState } from "react";
import { SpeakingModal } from "../../Components/SpeakingModal";
import { CommunityAPI } from "../../Scene";
import { notificationManager } from "../../Components/Notification";
import { questModalManager } from "../../Components/QuestModal";
import { eventManager } from "../../EventsManager";

interface Props {
  onClose: () => void;
  scene: any;
}
export const QuestTiff: React.FC<Props> = ({ onClose, scene }) => {
  const [step, setStep] = useState<number>(0);
  const [canBurn, setCanBurn] = useState<boolean>(false);

  const playerInventory = CommunityAPI.game.inventory;

  useEffect(() => {
    questModalManager.preventClose(false);
    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.tiff === "waiting") setStep(6);
    if (player_quests.tiff === "done") setStep(7);

    const carrots = Number(playerInventory["Carrot"] || 0);
    const potatoes = Number(playerInventory["Potato"] || 0);
    const cabbages = Number(playerInventory["Cabbage"] || 0);

    if (carrots >= 100 && potatoes >= 100 && cabbages >= 30) {
      setCanBurn(true);
    }
  }, []);

  const handleQuestComplete = async () => {
    setStep(6.1);

    try {
      questModalManager.preventClose(true);

      await CommunityAPI.burn({
        metadata: JSON.stringify({
          quests: {
            tiff: {
              done_at: Date.now(),
            },
          },
        }),
        items: {
          Carrot: 100,
          Potato: 100,
          Cabbage: 30,
        },
      });
      scene.sendQuestUpdate("season_1", "tiff", "done");
      setStep(6.3);
    } catch (e) {
      console.error(e);
      setStep(6.2);
    }
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
              text: "Ah, a new face! Welcome to the Arcadian Reclaim island. I am Envoy Tiff. You must be one of the envoys sent to help us bring peace to this island. Is that correct?",
              actions: [
                {
                  text: "Yes, I am here to help.",
                  cb: () => setStep(3),
                },
                {
                  text: "Actually, I just stumbled upon this place.",
                  cb: () => setStep(1),
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
              text: "Ah, a wanderer then. Well, you're welcome to stay and help. We could use all the assistance we can get.",
              actions: [
                {
                  text: "Tell me more about what's happening here.",
                  cb: () => setStep(2),
                },
                {
                  text: "I'll think about it.",
                  cb: () => onClose(),
                },
              ],
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
              text: "This island is home to four tribes, each with its own unique culture and beliefs. They are currently in conflict over a mysterious relic located at the top of an impassable mountain. We, the Arcadian envoys, are here to help resolve the conflict and study the relic.",
              actions: [
                {
                  text: "I'd like to help. What can I do?",
                  cb: () => setStep(3),
                },
                {
                  text: "This sounds too complicated for me.",
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
              text: "Fantastic! Before we delve into the complexities of the island and its tribes, could you assist me in gathering some food for the other envoys? We need 100 carrots, 100 potatoes, and 30 cabbages. After that I'll introduce you to the other envoys.",
              actions: [
                {
                  text: "Sure, I'll get right on it.",
                  cb: () => {
                    setStep(5);
                    scene.sendQuestUpdate("season_1", "tiff", "waiting");
                  },
                },
                {
                  text: "Why you need so much food?",
                  cb: () => setStep(4),
                },
              ],
            },
          ]}
        />
      )}
      {step === 4 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "We have many envoys, and they're working hard to bring peace to this island. They need sustenance to continue their efforts.",
              actions: [
                {
                  text: "Alright, I'll get the food.",
                  cb: () => {
                    setStep(5);
                    scene.sendQuestUpdate("season_1", "tiff", "waiting");
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
      {step === 5 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Great! Return when you have all the items, and I'll share more about our mission here.",
            },
          ]}
        />
      )}
      {step === 6 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Ah, you're back! Do you have the food items?",
              requirements: [
                {
                  label: "Carrots",
                  value: 100,
                  has: Number(playerInventory["Carrot"] || 0) >= 100,
                },
                {
                  label: "Potatoes",
                  value: 100,
                  has: Number(playerInventory["Potato"] || 0) >= 100,
                },
                {
                  label: "Cabbages",
                  value: 30,
                  has: Number(playerInventory["Cabbage"] || 0) >= 30,
                },
              ],
              actions: [
                {
                  text: "Yes, here they are.",
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
      {step === 6.1 && (
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
      {step === 6.2 && (
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
      {step === 6.3 && (
        <SpeakingModal
          onClose={() => {
            onClose();
            notificationManager.notification({
              title: "Congratulations!",
              description:
                "You've completed the first quest! You can now access the other quests.",
              icon: "Success",
            });
          }}
          message={[
            {
              text: "Thank you for the food items! I'll distribute them to the other envoys.",
            },
          ]}
        />
      )}
      {step === 7 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Hello Traveler! I'm glad you're still here, let me know if you need anything.",
              actions: [
                {
                  text: "Tell me more about our mission here.",
                  cb: () => setStep(8),
                },
                {
                  text: "Show me my progress.",
                  cb: () => {
                    eventManager.emit("showQuestsTracker"), onClose();
                  },
                },
              ],
            },
          ]}
        />
      )}
      {step === 8 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "Alright, let's talk about our mission here!",
              actionTitle: "Tell me more about...",
              actions: [
                {
                  text: "Lysari",
                  cb: () => setStep(8.1),
                },
                {
                  text: "Veyari",
                  cb: () => setStep(8.2),
                },
                {
                  text: "Pyrari",
                  cb: () => setStep(8.3),
                },
                {
                  text: "Aerari",
                  cb: () => setStep(8.4),
                },
              ],
            },
          ]}
        />
      )}
      {step === 8.1 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "The Lysari are a tribe of skilled fishermen and navigators who have lived by the south-east coast for generations. They believe that the relic is a gift from the sea gods and should be used to ensure bountiful catches and safe voyages.",
              actionTitle: "Tell me more about...",
              actions: [
                {
                  text: "Veyari",
                  cb: () => setStep(8.2),
                },
                {
                  text: "Pyrari",
                  cb: () => setStep(8.3),
                },
                {
                  text: "Aerari",
                  cb: () => setStep(8.4),
                },
              ],
            },
          ]}
        />
      )}
      {step === 8.2 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "The Veyari are a tribe of hunters and gatherers who live in the dense forests in the north-west of the island. They believe that the relic is a symbol of nature's power and should be used to maintain the balance of the ecosystem.",
              actionTitle: "Tell me more about...",
              actions: [
                {
                  text: "Lysari",
                  cb: () => setStep(8.1),
                },
                {
                  text: "Pyrari",
                  cb: () => setStep(8.3),
                },
                {
                  text: "Aerari",
                  cb: () => setStep(8.4),
                },
              ],
            },
          ]}
        />
      )}
      {step === 8.3 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "The Pyrari are a tribe of skilled blacksmiths and miners who live near the mountain ranges in the north-east. They believe that the relic is a piece of a fallen star and should be used to forge powerful weapons.",
              actionTitle: "Tell me more about...",
              actions: [
                {
                  text: "Lysari",
                  cb: () => setStep(8.1),
                },
                {
                  text: "Veyari",
                  cb: () => setStep(8.2),
                },
                {
                  text: "Aerari",
                  cb: () => setStep(8.4),
                },
              ],
            },
          ]}
        />
      )}
      {step === 8.4 && (
        <SpeakingModal
          onClose={() => {
            onClose();
          }}
          message={[
            {
              text: "The Aerari are a tribe of scholars and mages who reside in the mushroom forest in the south-west. They believe that the relic holds ancient wisdom and should be used to advance their magical studies.The Aerari are very secretive and hide their village with magic...",
              actionTitle: "Tell me more about...",
              actions: [
                {
                  text: "Lysari",
                  cb: () => setStep(8.1),
                },
                {
                  text: "Veyari",
                  cb: () => setStep(8.2),
                },
                {
                  text: "Pyrari",
                  cb: () => setStep(8.3),
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};
