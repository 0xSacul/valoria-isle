import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Panel, InnerPanel } from "./Panel";
import { Button } from "./Button";

const REPO_URL = "https://0xsacul.github.io/valoria-isle/";

const NauticalGear = REPO_URL + "assets/components/NauticalGear.png";
const ForestGem = REPO_URL + "assets/components/ForestGem.png";
const Cog = REPO_URL + "assets/components/Cog.png";
const MagicalRune = REPO_URL + "assets/components/MagicalRune.png";
const ArcadianMechanism = REPO_URL + "assets/objects/ArcadianMechanismIcon.png";
const ValoriaWreath = REPO_URL + "assets/icons/ValoriaWreath.png";
const ValoriaWreathMannequin = REPO_URL + "assets/sfts/ValoriaWreath.png";
const ArrowRight = REPO_URL + "assets/icons/ArrowRight.png";
const QuestionIcon = REPO_URL + "assets/icons/Question.png";

interface Props {
  scene: any;
  onClose: () => void;
  show: boolean;
}

export const QuestsTracker: React.FC<Props> = ({ scene, onClose, show }) => {
  const [selected, setSelected] = useState<number>(0);

  const [hasCog, setHasCog] = useState<boolean>(false);
  const [hasForestGem, setHasForestGem] = useState<boolean>(false);
  const [hasNauticalGear, setHasNauticalGear] = useState<boolean>(false);
  const [hasMagicalRune, setHasMagicalRune] = useState<boolean>(false);
  const [hasArcadianMechanism, setHasArcadianMechanism] =
    useState<boolean>(false);

  useEffect(() => {
    if (!scene.currentPlayer.db_data) return;

    const player_quests = scene.currentPlayer.db_data.quests.season_1 || {};

    if (player_quests.lysari === "done") setHasNauticalGear(true);
    if (player_quests.veyari === "done") setHasForestGem(true);
    if (player_quests.pyrari === "done") setHasCog(true);
    if (player_quests.aerari === "done") setHasMagicalRune(true);
    if (player_quests.final === "done") setHasArcadianMechanism(true);
  }, []);

  return (
    <>
      <Modal show={show} centered>
        <Panel>
          {selected === 0 && (
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-xl">Quests Tracker</h1>
              <span className="text-xxs mb-2">
                Select a quest to view your progress
              </span>
              <div className="flex flex-col items-center justify-center w-full gap-2">
                <InnerPanel
                  className="flex items-center justify-between w-full cursor-pointer hover:img-highlight"
                  onClick={() => setSelected(1)}
                >
                  <div className="flex items-center">
                    <img src={ValoriaWreath} className="w-12 mx-1" />
                    <div className="flex flex-col items-left text-left justify-center">
                      <h1 className="text-lg">Valoria Wreath</h1>
                      <span className="text-xxs">
                        {hasArcadianMechanism
                          ? "Quest Completed!"
                          : "Complete Arcadian Mechanism"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <img src={ArrowRight} alt="Arrow Right" className="w-6" />
                  </div>
                </InnerPanel>
                <InnerPanel className="flex items-center justify-between w-full opacity-50">
                  <div className="flex items-center">
                    <img src={QuestionIcon} className="w-6 mx-3" />
                    <div className="flex flex-col items-left text-left justify-center">
                      <h1 className="text-lg">Coming Soon</h1>
                      <span className="text-xxs">
                        Complete Villager Level 1 Quests
                      </span>
                    </div>
                  </div>
                  <div>
                    <img src={ArrowRight} alt="Arrow Right" className="w-6" />
                  </div>
                </InnerPanel>
                <InnerPanel className="flex items-center justify-between w-full opacity-50">
                  <div className="flex items-center">
                    <img src={QuestionIcon} className="w-6 mx-3" />
                    <div className="flex flex-col items-left text-left justify-center">
                      <h1 className="text-lg">Coming Soon</h1>
                      <span className="text-xxs">
                        Complete Villager Level 2 Quests
                      </span>
                    </div>
                  </div>
                  <div>
                    <img src={ArrowRight} alt="Arrow Right" className="w-6" />
                  </div>
                </InnerPanel>
                <InnerPanel className="flex items-center justify-between w-full opacity-50">
                  <div className="flex items-center">
                    <img src={QuestionIcon} className="w-6 mx-3" />
                    <div className="flex flex-col items-left text-left justify-center">
                      <h1 className="text-lg">Coming Soon</h1>
                      <span className="text-xxs">
                        Complete Villager Level 3 Quests
                      </span>
                    </div>
                  </div>
                  <div>
                    <img src={ArrowRight} alt="Arrow Right" className="w-6" />
                  </div>
                </InnerPanel>
              </div>
              <div className="flex w-full mt-2">
                <Button onClick={onClose} className="w-full">
                  Close
                </Button>
              </div>
            </div>
          )}
          {selected === 1 && (
            <div className="flex flex-col items-center justify-center w-full gap-2">
              <h1 className="text-xl mb-1">Valoria Wreath Quest</h1>
              <div className="flex flex-row items-start justify-center w-full">
                <img
                  src={ValoriaWreathMannequin}
                  alt="Valoria Wreath"
                  className="m-2 rounded-lg"
                />
                <div>
                  <h1 className="text-xl">Valoria Wreath</h1>
                  <span className="text-xxs text-center">
                    Can you help the tribes of Valoria? Complete all quests to
                    earn this exclusive Valoria Wreath for your Bumpkin!
                  </span>
                </div>
              </div>
              <div
                className={`flex flex-row items-center justify-between w-full mt-2 ${
                  hasNauticalGear ? "" : "opacity-50"
                }`}
              >
                <div className="flex flex-col ml-2 text-left">
                  <div className="text-lg">Nautical Gear</div>
                  <div className="text-xxs">
                    {hasNauticalGear
                      ? "Acquired from Lysari Tribe"
                      : "Acquire from Lysari Tribe"}
                  </div>
                </div>
                <img
                  src={NauticalGear}
                  alt="Nautical Gear"
                  className="w-12 mr-1 ml-2"
                />
              </div>
              <div
                className={`flex flex-row items-center justify-between w-full ${
                  hasForestGem ? "" : "opacity-50"
                }`}
              >
                <div className="flex flex-col ml-2 text-left">
                  <div className="text-lg">Forest Gem</div>
                  <div className="text-xxs">
                    {hasForestGem
                      ? "Acquired from Veyari Tribe"
                      : "Acquire from Veyari Tribe"}
                  </div>
                </div>
                <img
                  src={ForestGem}
                  alt="Forest Gem"
                  className="w-12 mr-1 ml-2"
                />
              </div>
              <div
                className={`flex flex-row items-center justify-between w-full ${
                  hasCog ? "" : "opacity-50"
                }`}
              >
                <div className="flex flex-col ml-2 text-left">
                  <div className="text-lg">Star Metal Cog</div>
                  <div className="text-xxs">
                    {hasCog
                      ? "Acquired from Pyrari Tribe"
                      : "Acquire from Pyrari Tribe"}
                  </div>
                </div>
                <img src={Cog} alt="Cog" className="w-12 mr-1 ml-2" />
              </div>
              <div
                className={`flex flex-row items-center justify-between w-full ${
                  hasMagicalRune ? "" : "opacity-50"
                }`}
              >
                <div className="flex flex-col ml-2 text-left">
                  <div className="text-lg">Magical Rune</div>
                  <div className="text-xxs">
                    {hasMagicalRune
                      ? "Acquired from Aerari Tribe"
                      : "Acquire from Aerari Tribe"}
                  </div>
                </div>
                <img
                  src={MagicalRune}
                  alt="Magical Rune"
                  className="w-12 mr-1 ml-2"
                />
              </div>
              <div
                className={`flex flex-row items-center justify-between w-full ${
                  hasArcadianMechanism ? "" : "opacity-50"
                }`}
              >
                <div className="flex flex-col ml-2 text-left">
                  <div className="text-lg">Arcadian Mechanism</div>
                  <div className="text-xxs">
                    {hasArcadianMechanism
                      ? "Mechanism Completed"
                      : "Complete Arcadian Mechanism"}
                  </div>
                </div>
                <img
                  src={ArcadianMechanism}
                  alt="Arcadian Mechanism"
                  className="w-12 mr-1 ml-2"
                />
              </div>
              <div className="flex w-full mt-2">
                <Button onClick={() => setSelected(0)} className="w-full">
                  Back
                </Button>
              </div>
            </div>
          )}
        </Panel>
      </Modal>
    </>
  );
};
/*

*/
