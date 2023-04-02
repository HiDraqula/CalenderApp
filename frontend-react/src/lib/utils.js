export function getMonths(date) {
  // Define the date for which you want to generate the list of months
  //   const date = new Date("2023-04-15");

  // Create an empty array to store the months and their corresponding number of days and first day of the month
  const monthsWithDaysAndFirstDay = [];

  // Loop through each month of the year
  for (let month = 0; month < 12; month++) {
    // Get the name of the month and the number of days in that month
    const monthName = new Date(date.getFullYear(), month, 1).toLocaleString(
      "default",
      { month: "short" }
    );
    const numDays = new Date(date.getFullYear(), month + 1, 0).getDate();

    // Get the name of the first day of the month
    // const firstDayOfMonth = new Date(
    //   date.getFullYear(),
    //   month,
    //   1
    // ).toLocaleString("default", { weekday: "short" });
    const firstDayOfMonth = new Date(date.getFullYear(), month, 1);
    const firstDay = firstDayOfMonth.getDay();
    const firstDayName = firstDayOfMonth.toLocaleString("default", {
      weekday: "short",
    });

    // Create an object for the month with its name, number of days, and first day of the month
    const monthObj = {
      month,
      name: monthName,
      days: numDays,
      //   firstDay: firstDayOfMonth,
      firstDay,
      firstDayName,
    };

    // Add the month object to the array
    monthsWithDaysAndFirstDay.push(monthObj);
  }
  // Print the array of months and their corresponding number of days and first day of the month
  //   console.log(monthsWithDaysAndFirstDay);
  return monthsWithDaysAndFirstDay;
  // [
  //     {month: 0, name: 'Jan', days: 31, firstDay: 0, firstDayName: 'Sun'},
  //     {month: 1, name: 'Feb', days: 28, firstDay: 3, firstDayName: 'Wed'},
  //     {month: 2, name: 'Mar', days: 31, firstDay: 3, firstDayName: 'Wed'},
  //     {month: 3, name: 'Apr', days: 30, firstDay: 6, firstDayName: 'Sat'},
  //     {month: 4, name: 'May', days: 31, firstDay: 1, firstDayName: 'Mon'},
  //     {month: 5, name: 'Jun', days: 30, firstDay: 4, firstDayName: 'Thu'},
  //     {month: 6, name: 'Jul', days: 31, firstDay: 6, firstDayName: 'Sat'},
  //     {month: 7, name: 'Aug', days: 31, firstDay: 2, firstDayName: 'Tue'},
  //     {month: 8, name: 'Sep', days: 30, firstDay: 5, firstDayName: 'Fri'},
  //     {month: 9, name: 'Oct', days: 31, firstDay: 0, firstDayName: 'Sun'},
  //     {month: 10, name: 'Nov', days: 30, firstDay: 3, firstDayName: 'Wed'},
  //     {month: 11, name: 'Dec', days: 31, firstDay: 5, firstDayName: 'Fri'}
  // ]
}
export function isToday(date = {}) {
  const today = new Date();
  let res =
    today.getFullYear() === (date.year || date?.getFullYear()) &&
    today.getMonth() === (date.month || date?.getMonth()) &&
    today.getDate() === (date.day || date?.getDate());
  // console.log(
  //   { date },
  //   today.getFullYear(),
  //   today.getMonth(),
  //   today.getDate(),
  //   res
  // );
  return res;
}
