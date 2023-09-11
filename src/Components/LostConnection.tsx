import React from "react";
import { Panel } from "./Panel";

const REPO_URL = "https://0xsacul.github.io/valoria-isle/";

const HumanDeath = REPO_URL + "assets/other/HumanDeath.gif";

export const LostConnection: React.FC = () => {
  return (
    <Panel>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xxl">Oh no!</h1>
        <h2 className="text-xl">You lost connection to the server.</h2>
        <img src={HumanDeath} alt="Human Death" className="mt-4 mb-4" />
        <span className="text-sm mb-2">
          Please refresh the page to reconnect.
        </span>
      </div>
    </Panel>
  );
};
