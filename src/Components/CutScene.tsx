import React from "react";

const VIDEO =
  "https://0xsacul.github.io/projectdignity-community-island/assets/video/SpellCutscene.mp4";

export const CutScene: React.FC = () => {
  return (
    <div className="fixed inset-0" style={{ zIndex: 1000 }}>
      <div className="absolute inset-0 bg-black opacity-100"></div>
      <div className="absolute inset-0 flex justify-center items-center">
        <video autoPlay className="w-screen" src={VIDEO}></video>
      </div>
    </div>
  );
};
