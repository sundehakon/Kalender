import mapJulianWeekday from "./mapJulianWeekday";
import mapGregorianWeekday from "./mapGregorianWeekday";
import mapFictiveWeekday from "./mapFictiveCalendarWeekday";

import { FictiveCalendarCalendarSystemMap } from "@/types/fictiveCalendarCalendarSystemMap";

export default function returnWeekday(day: number, month: number, year: number) {
   //Input = a date - day, month and year (BC is negative)
   //Output = an integer that can be mapped to determine the weekday

   //Determine what calender "type" is used (Gregorian, Julian or Fictive)
   //Gregorian = 0, Julian = 1, Fictive = 2
   let calenderType: FictiveCalendarCalendarSystemMap;

   let calenderTypeInteger = 0;
   if (year > -1000 && year < -45) {
      calenderTypeInteger = 0; //Fictive
   } else if (year >= -45 && year <= 1582) {
      calenderTypeInteger = 1; //Julian
   } else if (year > 1582) {
      calenderTypeInteger = 2; //Gregorian
   }

   //Determine the weekday using the Zeller's Congruence algorithm
   let weekdayInteger = null;
   let weekday = null;
   switch (calenderTypeInteger) {
      case 0: //Fictive
         weekdayInteger = (day + Math.floor((13 * (month + 1)) / 5) + year + Math.floor(year / 4) + 2) % 7;
         weekday = mapFictiveWeekday(weekdayInteger);
         calenderType = FictiveCalendarCalendarSystemMap.Fictive;
         break;
      case 1: //Julian
         weekdayInteger = (day + Math.floor((13 * (month + 1)) / 5) + year + Math.floor(year / 4) + 5) % 7;
         weekday = mapJulianWeekday(weekdayInteger);
         calenderType = FictiveCalendarCalendarSystemMap.Julian;
         break;
      case 2: //Gregorian
         weekdayInteger =
            (day + Math.floor((13 * (month + 1)) / 5) + year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400) + 6) % 7;
         weekday = mapGregorianWeekday(weekdayInteger);
         calenderType = FictiveCalendarCalendarSystemMap.Gregorian;
         break;
      default:
         throw new Error("Invalid calendar type");
   }

   //Check if the date exists in the calender system, f.eks. 10. oktober 1582 does not exist
   //MANGLER FUNKSJONALITET
   let dateExists = true;

   let returnData = {
      weekday: weekday,
      calenderType: calenderType,
      dateExists: dateExists,
   };

   return returnData;
}
