export enum BrowserName {
  Firefox = "Mozilla Firefox",
  SamsungInternet = "Samsung Internet",
  Opera = "Opera",
  EdgeLegacy = "Microsoft Edge (Legacy)",
  EdgeChromium = "Microsoft Edge (Chromium)",
  Chrome = "Google Chrome or Chromium",
  Safari = "Apple Safari",
  Unknown = "unknown",
}

export const getBrowserName = (userAgent: string): BrowserName => {
  if (userAgent.includes("Firefox")) {
    return BrowserName.Firefox;
  } else if (userAgent.includes("SamsungBrowser")) {
    return BrowserName.SamsungInternet;
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return BrowserName.Opera;
  } else if (userAgent.includes("Edge")) {
    return BrowserName.EdgeLegacy;
  } else if (userAgent.includes("Edg")) {
    return BrowserName.EdgeChromium;
  } else if (userAgent.includes("Chrome")) {
    return BrowserName.Chrome;
  } else if (userAgent.includes("Safari")) {
    return BrowserName.Safari;
  } else {
    return BrowserName.Unknown;
  }
};
