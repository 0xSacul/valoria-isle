import React from "react";
import classNames from "classnames";

import { pixelDarkBorderStyle, pixelLightBorderStyle } from "./lib/style";
import { PIXEL_SCALE } from "./lib/style";

interface OuterPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  hasTabs?: boolean;
}

/**
 * Default panel has the double layered pixel effect
 */
export const Panel: React.FC<OuterPanelProps> = ({
  children,
  hasTabs,
  ...divProps
}) => {
  return (
    <>
      <OuterPanel hasTabs={hasTabs} {...divProps}>
        <InnerPanel>{children}</InnerPanel>
      </OuterPanel>
    </>
  );
};

/**
 * Light panel with border effect
 */
export const InnerPanel: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...divProps
}) => {
  const { className, style, ...otherDivProps } = divProps;
  return (
    <div
      className={classNames("bg-brown-300", className)}
      style={{
        ...pixelLightBorderStyle,
        padding: `${PIXEL_SCALE * 1}px`,
        ...style,
      }}
      {...otherDivProps}
    >
      {children}
    </div>
  );
};

/**
 * A panel with a single layered pixel effect
 */
export const OuterPanel: React.FC<OuterPanelProps> = ({
  children,
  hasTabs,
  ...divProps
}) => {
  const { className, style, ...otherDivProps } = divProps;
  return (
    <div
      className={classNames("bg-brown-600 text-white", className)}
      style={{
        ...pixelDarkBorderStyle,
        padding: `${PIXEL_SCALE * 1}px`,
        ...(hasTabs ? { paddingTop: `${PIXEL_SCALE * 15}px` } : {}),
        ...style,
      }}
      {...otherDivProps}
    >
      {children}
    </div>
  );
};
