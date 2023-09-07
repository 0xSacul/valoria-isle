export const PIXEL_SCALE = 2.625;
const BASE_URL = "https://0xsacul.github.io/prophunt-community-island/";

const lightBorder = BASE_URL + "assets/panel/light_border.png";
const grayBorder = BASE_URL + "assets/panel/gray_border.png";
const darkBorder = BASE_URL + "assets/panel/dark_border.png";
const roomBorder = BASE_URL + "assets/panel/room_border.webp";
const tableBorder = BASE_URL + "assets/panel/table_border2.webp";
const greenBorder = BASE_URL + "assets/panel/green_border.png";
const tabBorderStart = BASE_URL + "assets/panel/tab_border_start.png";
const tabBorderMiddle = BASE_URL + "assets/panel/tab_border_middle.png";
const progressBarBorder = BASE_URL + "assets/progress/progress_bar_border.png";
const speechBubbleBorder = BASE_URL + "assets/speech_bubble.webp";

const pixelizedBorderStyle: React.CSSProperties = {
  borderStyle: "solid",
  borderWidth: `${PIXEL_SCALE * 2}px`,
  borderImageSlice: "20%",
  imageRendering: "pixelated",
  borderImageRepeat: "stretch",
  borderRadius: `${PIXEL_SCALE * 5}px`,
};

export const pixelGrayBorderStyle: React.CSSProperties = {
  borderImage: `url(${grayBorder})`,
  ...pixelizedBorderStyle,
};

export const pixelLightBorderStyle: React.CSSProperties = {
  borderImage: `url(${lightBorder})`,
  ...pixelizedBorderStyle,
};

export const pixelRoomBorderStyle: React.CSSProperties = {
  borderImage: `url(${roomBorder})`,
  borderStyle: "solid",
  borderWidth: `${PIXEL_SCALE * 6}px`,
  borderImageSlice: "20%",
  imageRendering: "pixelated",
  borderImageRepeat: "stretch",
  borderRadius: `${PIXEL_SCALE * 8}px`,
};

export const pixelTableBorderStyle: React.CSSProperties = {
  borderImage: `url(${tableBorder})`,
  borderStyle: "solid",
  borderWidth: `${PIXEL_SCALE * 2}px ${PIXEL_SCALE * 2}px ${PIXEL_SCALE * 5}px`,
  borderImageSlice: "10% 10% 20%",
  imageRendering: "pixelated",
  borderImageRepeat: "stretch",
  borderRadius: `${PIXEL_SCALE * 2.8}px`,
};

export const pixelSpeechBubbleBorderStyle: React.CSSProperties = {
  borderImage: `url(${speechBubbleBorder})`,
  backgroundColor: "white",
  borderWidth: `${PIXEL_SCALE * 3}px`,
  ...pixelizedBorderStyle,
};

export const pixelDarkBorderStyle: React.CSSProperties = {
  borderImage: `url(${darkBorder})`,
  ...pixelizedBorderStyle,
};

export const pixelGreenBorderStyle: React.CSSProperties = {
  borderImage: `url(${greenBorder})`,
  ...pixelizedBorderStyle,
};

export const pixelTabBorderStartStyle: React.CSSProperties = {
  borderImage: `url(${tabBorderStart})`,
  ...pixelizedBorderStyle,
  borderRadius: `${PIXEL_SCALE * 5}px ${PIXEL_SCALE * 5}px 0 0`,
};

export const pixelTabBorderMiddleStyle: React.CSSProperties = {
  borderImage: `url(${tabBorderMiddle})`,
  ...pixelizedBorderStyle,
  borderRadius: `${PIXEL_SCALE * 5}px ${PIXEL_SCALE * 5}px 0 0`,
};

export const progressBarBorderStyle: React.CSSProperties = {
  borderImage: `url(${progressBarBorder})`,
  ...pixelizedBorderStyle,
  borderLeftWidth: `${PIXEL_SCALE * 2}px`,
  borderRightWidth: `${PIXEL_SCALE * 2}px`,
  borderTopWidth: `${PIXEL_SCALE * 2}px`,
  borderBottomWidth: `${PIXEL_SCALE * 3}px`,
  borderImageSlice: "20% 20% 30%",
};
