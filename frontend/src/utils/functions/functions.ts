import moment from 'moment-timezone';

export const defaultMargin = "0px 0px 5px 0px";
export function formatDate(date?: Date): string {
  if (date === undefined) return "";
  let newDate = new Date(date);
  let day = ("0" + newDate.getDate()).slice(-2);
  let month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  let year = newDate.getFullYear();

  let formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}
export function convertUtctoGmtPlus2(utcDate: string | Date): Date {
  const date = new Date(utcDate);
  const offset = 120; // offset for GMT+2 in minutes
  const gmtPlus2Date = new Date(date.getTime() + offset * 60000);
  return gmtPlus2Date;
}
export function convertUtctoAustriaTime(utcDate: string | Date): Date {
  const date = moment.tz(utcDate, "UTC");
  const austriaTime = date.tz("Europe/Vienna").toDate();
  return austriaTime;
}
export function calculateTimeElapsed(startDate: Date): string {
  startDate = new Date(startDate);
  const currentTime = new Date().getTime();
  const startTime = startDate.getTime();
  const duration = currentTime - startTime;

  if (duration < 5 * 60 * 1000) {
    return "vor Kurzem"; // Less than 5 minutes
  } else if (duration < 60 * 60 * 1000) {
    const minutes = Math.floor(duration / (60 * 1000));
    return `vor ${minutes} Minut${minutes !== 1 ? "en" : "e"}`;
  } else if (duration < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(duration / (60 * 60 * 1000));
    return `vor ${hours} Stund${hours !== 1 ? "en" : "e"}`;
  } else if (duration < 365 * 24 * 60 * 60 * 1000) {
    const days = Math.floor(duration / (24 * 60 * 60 * 1000));
    return `vor ${days} Tag${days !== 1 ? "en" : ""}`;
  } else {
    return "Over a year ago";
  }
}
export function calculateTimeElapsedInvoices(startDate: Date): string {
  startDate = new Date(startDate);
  const currentTime = new Date().getTime();
  const startTime = startDate.getTime();
  const duration = currentTime - startTime;

  if (duration < 5 * 60 * 1000) {
    return "Neu"; // Less than 5 minutes
  } else if (duration < 60 * 60 * 1000) {
    const minutes = Math.floor(duration / (60 * 1000));
    return `vor ${minutes} Minut${minutes !== 1 ? "en" : "e"}`;
  } else {
    return "";
  }
}
export function calculateDaysUntil(date: Date): string {
  const currentDate = new Date();
  // Set time of both dates to noon (12:00 PM)
  currentDate.setHours(12, 0, 0, 0);
  date.setHours(12, 0, 0, 0);

  const diffInMilliseconds = date.getTime() - currentDate.getTime();
  const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Heute";
  }
  else if (diffInDays === 1) {
    return "Morgen";
  }
  return `in ${diffInDays} Tag${diffInDays !== 1 ? "en" : ""}`;
}
export function deepObjectEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (obj1 instanceof Date && obj2 instanceof Date) return obj1.getTime() === obj2.getTime();

  if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
    if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null)
      return false;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!deepObjectEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  } else if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;

    for (let i = 0; i < obj1.length; i++) {
      if (!deepObjectEqual(obj1[i], obj2[i])) return false;
    }

    return true;
  } else {
    return false;
  }
}
export const groupArrayBy = (data: any[], key: string): Record<string, any> => {
  const groupedData = data.reduce((acc, curr) => {
    const val = curr[key];
    if (!acc[val]) {
      acc[val] = [];
    }
    acc[val].push(curr);
    return acc;
  }, {});

  return groupedData;
}
export function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.body.removeChild(textArea);
}