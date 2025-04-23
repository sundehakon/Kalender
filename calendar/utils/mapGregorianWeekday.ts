const numberToGregorianWeekdayMapper: Record<number, string> = {
   1: "Monday",
   2: "Tuesday",
   3: "Wednesday",
   4: "Thursday",
   5: "Friday",
   6: "Saturday",
   7: "Sunday",
};

export default function mapGregorianWeekday(weekday: number): string {
   if (weekday < 0 || weekday > 6) {
      throw new Error("Invalid weekday number. Must be between 0 and 6.");
   }
   return numberToGregorianWeekdayMapper[weekday];
}
