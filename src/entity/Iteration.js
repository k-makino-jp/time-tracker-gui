import { convertUnixTimeToLocaleDate } from "../utility/Date";

export class Iteration {
  constructor(start, end) {
    this.start = convertUnixTimeToLocaleDate(start.getTime());
    this.end = convertUnixTimeToLocaleDate(end.getTime());
  }
}