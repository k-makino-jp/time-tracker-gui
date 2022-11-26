import { convertUnixtimeToHHMMSS, convertUnixtimeToLocaleHHMMSS } from "../utility/Date";

export class Task {
  constructor(name, start = null, end = null) {
    this.name = name;
    this.start = start;
    this.end = end;
    this.spend = null;
    this.spendFormatted = '00:00:00';
  }
  setStart(start) {
    this.start = start;
    this.startFormatted = convertUnixtimeToLocaleHHMMSS(this.start.getTime());
  }
  setEnd(end) {
    this.end = end;
    this.endFormatted = convertUnixtimeToLocaleHHMMSS(this.end.getTime());
    this.spend = this.end - this.start;// [millsecond]
    this.spendFormatted = convertUnixtimeToHHMMSS(this.spend);
  }
  clear() {
    this.name = '';
    this.start = null;
    this.end = null;
    this.spend = null;
    this.spendFormatted = '00:00:00';
  }
}

export function calculateTotalTimeSpend(tasks) {
  const total = tasks.reduce((total, task) => total + task.spend, 0);
  return convertUnixtimeToHHMMSS(total);
}

export function calculateTotalTimeSpendForEachTask(tasks) {
  const redundantTaskNames = tasks.map(task => task.name);
  const taskNames = [...new Set(redundantTaskNames)];
  
  const analyzedTasks = [];
  taskNames.forEach(name => {
    const total = tasks
      .filter(task => {return task.name === name; })
      .reduce((total, task) => total + task.spend, 0);
    analyzedTasks.push({
      name: name,
      spend: total,
      spendFormatted: convertUnixtimeToHHMMSS(total),
    })
  });
  return analyzedTasks;
}