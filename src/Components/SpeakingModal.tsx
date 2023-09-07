import React, { useCallback, useEffect, useState } from "react";

import { Panel } from "./Panel";
import classNames from "classnames";
import { TypingMessage } from "./TypingMessage";
import { Button } from "./Button";

export type Message = {
  text: string;
  jsx?: JSX.Element;
  actions?: { text: string; disabled?: boolean; cb: () => void }[];
  actionTitle?: string;
  requirements?: {
    label: string;
    value: number;
    has: boolean;
  }[];
};

interface Props {
  onClose: () => void;
  className?: string;
  message: Message[];
}

/**
 * A custom panel built for talking NPCs.
 */
export const SpeakingModal: React.FC<Props> = ({
  onClose,
  className,
  message,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentTextEnded, setCurrentTextEnded] = useState(false);
  const [forceShowFullMessage, setForceShowFullMessage] = useState(false);

  const handleClick = useCallback(() => {
    if (!currentTextEnded) {
      setCurrentTextEnded(true);
      setForceShowFullMessage(true);
    } else {
      const isLast = currentMessage === message.length - 1;
      const hasActions = message[currentMessage].actions?.length;

      if (isLast && hasActions) {
        return;
      }
      setCurrentTextEnded(false);
      setForceShowFullMessage(false);
      if (!isLast) {
        setCurrentMessage(currentMessage + 1);
      } else {
        setCurrentMessage(0);
        onClose();
      }
    }
  }, [currentTextEnded, currentMessage, message.length]);

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (["Enter", "Space", "Escape"].includes(e.code)) {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyPressed);

    return () => window.removeEventListener("keydown", handleKeyPressed);
  }, [handleClick]);

  const maxLength = Math.max(...message.map((m) => m.text.length));
  let lines = maxLength / 30;
  const hasButton = message.find((m) => !!m.actions);
  if (hasButton) {
    lines += 1;
  }

  const showActions =
    (currentTextEnded || forceShowFullMessage) &&
    message[currentMessage].actions;
  return (
    <Panel className={classNames("relative w-full", className)}>
      <div style={{ minHeight: `${lines * 25}px` }} className="flex flex-col">
        <div
          className={classNames("flex-1 p-1 flex flex-col  mb-1", {
            "cursor-pointer": !currentTextEnded || !showActions,
          })}
          onClick={handleClick}
        >
          <TypingMessage
            message={message[currentMessage].text}
            key={currentMessage}
            onMessageEnd={() => setCurrentTextEnded(true)}
            forceShowFullMessage={forceShowFullMessage}
          />
          {currentTextEnded && message[currentMessage].jsx}
        </div>
        {!showActions && (
          <p className="text-xxs italic float-right p-1">(Tap to continue)</p>
        )}
        {showActions && message[currentMessage].requirements && (
          <div>
            {message[currentMessage].requirements?.map((req, index) => (
              <p
                key={req.label}
                className={classNames("text-xs italic float-left p-1", {
                  "text-red-500": !req.has,
                })}
              >
                {req.value} {req.label}
                <span className="text-white">
                  {index < message[currentMessage].requirements!.length - 1 &&
                    ","}
                </span>
              </p>
            ))}
          </div>
        )}
        {showActions && message[currentMessage].actionTitle && (
          <div>
            <p className="text-xxs italic float-left p-1">
              {message[currentMessage].actionTitle}
            </p>
          </div>
        )}
        {showActions && (
          <div className="flex flex-col space-y-1 mt-1 space-y-reverse md:flex-row md:space-y-0 md:space-x-1">
            {message[currentMessage].actions?.map((action) => (
              <Button
                key={action.text}
                className={classNames("w-full", {
                  "opacity-50 cursor-not-allowed": action.disabled,
                })}
                onClick={(e) => {
                  if (action.disabled) {
                    return;
                  }

                  e.stopPropagation();
                  e.preventDefault();
                  action.cb();
                }}
              >
                {action.text}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
};

export const SpeakingText: React.FC<Pick<Props, "message" | "onClose">> = ({
  message,
  onClose,
}) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentTextEnded, setCurrentTextEnded] = useState(false);
  const [forceShowFullMessage, setForceShowFullMessage] = useState(false);

  const maxLength = Math.max(...message.map((m) => m.text.length));
  const lines = maxLength / 30;

  const handleClick = useCallback(() => {
    // Cannot accidentally click through last message
    if (currentTextEnded && currentMessage === message.length - 1) {
      onClose();
      return;
    }

    if (currentTextEnded) {
      setCurrentTextEnded(false);
      setForceShowFullMessage(false);

      if (currentMessage < message.length - 1) {
        setCurrentMessage(currentMessage + 1);
      } else {
        setCurrentMessage(0);
      }
    } else {
      setCurrentTextEnded(true);
      setForceShowFullMessage(true);
    }
  }, [currentTextEnded, currentMessage, message.length]);

  useEffect(() => {
    const handleKeyPressed = (e: KeyboardEvent) => {
      if (["Enter", "Space", "Escape"].includes(e.code)) {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyPressed);

    return () => window.removeEventListener("keydown", handleKeyPressed);
  }, [handleClick]);

  const showActions =
    (currentTextEnded || forceShowFullMessage) &&
    message[currentMessage]?.actions;

  return (
    <>
      <div
        className="p-1 flex flex-col cursor-pointer"
        style={{ minHeight: `${lines * 25}px` }}
        onClick={handleClick}
      >
        <div className="flex-1 pb-2">
          <TypingMessage
            message={message[currentMessage].text}
            key={currentMessage}
            onMessageEnd={() => setCurrentTextEnded(true)}
            forceShowFullMessage={forceShowFullMessage}
          />
          {currentTextEnded && message[currentMessage].jsx}
        </div>
        {!showActions && (
          <p className="text-xxs italic float-right">(Tap to continue)</p>
        )}
      </div>
      {showActions && (
        <div className="grid grid-cols-2 gap-1">
          {message[currentMessage].actions?.map((action) => (
            <Button
              key={action.text}
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                action.cb();
              }}
            >
              {action.text}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};
