import React from "react";
import { Panel } from "./Panel";
import { Button } from "./Button";

const REPO_URL = "https://0xsacul.github.io/valoria-isle/";

const HumanDeath = REPO_URL + "assets/other/HumanDeath.gif";

export const Banned: React.FC = () => {
  return (
    <Panel>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xxl">Oh no!</h1>
        <h2 className="text-xl">You've been banned from this Island.</h2>
        <img src={HumanDeath} alt="Human Death" className="mt-4 mb-4" />
        <Button onClick={() => window.history.back()}>Go Home</Button>
      </div>
    </Panel>
  );
};
