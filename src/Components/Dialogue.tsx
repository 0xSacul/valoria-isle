import React from "react";
import { SpeakingModal } from "./SpeakingModal";

type Props = {
  scene?: any;
  onClose: () => void;
  message: string;
  actions?: {
    text: string;
    cb: () => void;
  }[];
};

export const Dialogue: React.FC<Props> = ({ onClose, message, actions }) => {
  return (
    <>
      {message && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
          style={{ width: "70vw" }}
        >
          <SpeakingModal
            onClose={() => {
              onClose();
            }}
            message={[
              {
                text: message,
                actions,
              },
            ]}
            hideContinue={true}
          />
        </div>
      )}
    </>
  );
};
