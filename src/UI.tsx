import React from "react";

import { QuestModal } from "./Components/QuestModal";

type Props = {
  scene: any;
};

export const UI: React.FC<Props> = ({ scene }) => {
  return (
    <>
      <QuestModal scene={scene} />
    </>
  );
};
