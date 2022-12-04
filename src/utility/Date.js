export function convertUnixtimeToHHMMSS(unixtime) {
  // get hh:mm:ss part of YYYY-MM-DDThh:mm:ssZ
  return new Date(unixtime).toISOString().substring(11, 19);
}

export function convertUnixtimeToLocaleHHMMSS(unixtime) {
  // get hh:mm:ss part of Thu Jan DD YYYY hh:mm:ss GMT+0900 (JST)
  return new Date(unixtime).toString().substring(16, 24);
}

export function convertUnixTimeToLocaleDate(unixtime) {
  const date = new Date(unixtime);
  const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000
  return new Date(unixtime + timeZoneOffset);
}