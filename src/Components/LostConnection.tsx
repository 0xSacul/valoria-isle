import React from "react";
import { Modal } from "react-bootstrap";
import { Panel } from "./Panel";

const HumanDeath =
  "https://0xsacul.github.io/projectdignity-community-island/assets/other/HumanDeath.gif";

export const LostConnection: React.FC = () => {
  return (
    <Modal show={true} centered backdrop="static">
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
    </Modal>
  );
};
