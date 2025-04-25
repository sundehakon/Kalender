const julianWeekdayMapper: Record<number, string> = {
   0: "Saturday",
   1: "Sunday",
   2: "Monday",
   3: "Tuesday",
   4: "Wednesday",
   5: "Thursday",
   6: "Friday",
};


export default function mapJulianWeekday(weekday: number): string {
   if (weekday < 0 || weekday > 6) {
      throw new Error("Invalid weekday number. Must be between 0 and 6.");
   }
   return julianWeekdayMapper[weekday];
}
