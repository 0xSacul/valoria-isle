import React from "react";
import { Panel } from "./Panel";
import { Button } from "./Button";

const REPO_URL = "https://0xsacul.github.io/valoria-isle/";

const ArrowRight = REPO_URL + "assets/icons/ArrowRight.png";
const Heart = REPO_URL + "assets/icons/Heart.png";
const Exclamation = REPO_URL + "assets/icons/Exclamation.png";

interface Props {
  onClose: () => void;
}

export const IsleIntroduction: React.FC<Props> = ({ onClose }) => {
  return (
    <>
      <Panel>
        <div className="p-2">
          <p className="text-lg mb-2 text-center">
            Howdy traveller! A few quick rules before you begin your adventure.
          </p>
          <div className="flex mb-2">
            <div className="w-8">
              <img src={ArrowRight} className="h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                Be nice to others. No harrasment, swearing or bullying.
              </p>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="w-8">
              <img src={ArrowRight} className="h-6" />
            </div>
            <div className="flex-1">
              <p className="text-sm">
                No spamming, trading, advertising or begging.
              </p>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="w-8">
              <img src={ArrowRight} className="h-6" />
            </div>
            <p className="text-sm flex-1">
              Any form of cheating or exploiting is not allowed.
            </p>
          </div>
          <div className="flex mb-4">
            <div className="w-8">
              <img src={Heart} className="h-6" />
            </div>
            <p className="text-sm flex-1">
              We recommend you to turn your music on and play on a computer for
              the best experience.
            </p>
          </div>
          <div className="flex items-center mb-1">
            <div className="flex w-8 justify-center">
              <img src={Exclamation} className="h-6" />
            </div>
            <p className="text-xxs flex-1">
              If you break any of these rules, Project Dignity's Team keeps the
              right to prevent you from playing on this island.
            </p>
          </div>
        </div>
        <Button onClick={onClose}>Continue</Button>
        <div className="w-full flex justify-center">
          <a
            href="https://discord.gg/Y37XURyJkS"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white text-xs text-center"
          >
            Made by Project Dignity's Team
          </a>
        </div>
      </Panel>
    </>
  );
};
