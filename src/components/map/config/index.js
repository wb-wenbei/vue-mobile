import AMap from "AMap";

export function getPosition() {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Geolocation", () => {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,
        timeout: 5000,
        buttonOffset: new AMap.Pixel(10, 20),
        zoomToAccuracy: true,
        useNative: true,
        buttonPosition: "RB"
      });
      geolocation.getCurrentPosition();
      AMap.event.addListener(geolocation, "complete", data => {
        resolve(data.position);
      });
      AMap.event.addListener(geolocation, "error", data => {
        reject(data);
      });
    });
  });
}
