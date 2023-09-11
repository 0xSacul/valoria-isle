import React, { useState, useEffect } from "react";
import { Panel } from "./Panel";
import { Button } from "./Button";

export const Loading: React.FC = () => {
  const [allowRefresh, setAllowRefresh] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setAllowRefresh(true);
    }, 5000);
  }, []);

  return (
    <Panel>
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-xl mt-2 mb-2">Loading...</h1>
      </div>

      {allowRefresh && (
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-sm mb-1">
            It looks like you're stuck, try refreshing.
          </h2>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      )}
    </Panel>
  );
};
