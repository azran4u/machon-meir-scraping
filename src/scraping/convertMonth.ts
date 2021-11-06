export function convertDate(date: string) {
  const [hebrewMonth, stringDay, stringYear] = date
    .substring(date.indexOf(`(`) + 1, date.indexOf(`)`))
    .replace(`,`, "")
    .split(" ");
  const month = convertMonthToNumber(hebrewMonth);
  const day = +stringDay;
  const year = +stringYear;
  return new Date(year, month, day, 0, 0, 0, 0);
}
export function convertMonthToNumber(month: string) {
  const convertMonth = new Map<string, number>();
  convertMonth.set("ינואר", 0);
  convertMonth.set("פברואר", 1);
  convertMonth.set("מרץ", 2);
  convertMonth.set("אפריל", 3);
  convertMonth.set("מאי", 4);
  convertMonth.set("יוני", 5);
  convertMonth.set("יולי", 6);
  convertMonth.set("אוגוסט", 7);
  convertMonth.set("ספטמבר", 8);
  convertMonth.set("אוקטובר", 9);
  convertMonth.set("נובמבר", 10);
  convertMonth.set("דצמבר", 11);
  const res = convertMonth.get(month);
  if (!res) return 0;
  return res;
}
