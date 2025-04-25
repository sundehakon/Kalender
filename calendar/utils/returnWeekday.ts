import mapJulianWeekday from "./mapJulianWeekday";
import mapGregorianWeekday from "./mapGregorianWeekday";
import mapFictiveWeekday from "./mapFictiveCalendarWeekday";

import { FictiveCalendarCalendarSystemMap } from "@/types/fictiveCalendarCalendarSystemMap";
import DateResponse from "@/types/dateResponse";

export default function returnWeekday(day: number, month: number, year: number): DateResponse {
   //Input = a date - day, month and year (BC is negative)
   //Output = an integer that can be mapped to determine the weekday

   //Determine what calender "type" is used (Gregorian, Julian or Fictive)

   console.log("Input: ", day, month, year);

   // Year 1 Before Christ is year 0, negative years have to be added with + 1 to be valid in zellers congruence

   if (year < 0) {
      year = year + 1;
   } else if (year === 0) {
      year = 1;
   }

   console.log("Adjusted year: ", year);

   let calenderType: FictiveCalendarCalendarSystemMap;

   let message = "Invalid date";
   let dateExists = false;
   let calenderTypeInteger = 0;

   if (year > -1000 && year < -45) {
      calenderTypeInteger = 0; // Fictive

      if (year % 4 === 0) {
         if (month === 2 && day > 29) {
            message = "Invalid date: February cannot have more than 29 days in a leap year.";
            dateExists = false;
         } else if (month === 2 && day <= 29) {
            message = "Valid date: February has 29 days in a leap year.";
            dateExists = true;
         }
         else if (day > 31) {
            message = "Invalid date: Month cannot have more than 31 days.";
            dateExists = false;
         } else if (day === 31) {
            if (month === 4 || month === 6 || month === 9 || month === 11) {
               message = "Invalid date: Month cannot have more than 30 days.";
               dateExists = false;
            } else {
               message = "Valid date: Month has 31 days.";
               dateExists = true;
            }
         } else {
            message = "Valid date";
            dateExists = true;
         }
      } else {
         if (month === 2 && day > 28) {
            message = "Invalid date: February cannot have more than 28 days in a non-leap year.";
            dateExists = false;
         } else if (month === 2 && day <= 28) {
            message = "Valid date: February has 28 days in a non-leap year.";
            dateExists = true;
         } else if (day > 31) {
            message = "Invalid date: Month cannot have more than 31 days.";
            dateExists = false;
         } else if (day === 31) {
            if (month === 4 || month === 6 || month === 9 || month === 11) {
               message = "Invalid date: Month cannot have more than 30 days.";
               dateExists = false;
            } else {
               message = "Valid date: Month has 31 days.";
               dateExists = true;
            }
         } else {
            message = "Valid date";
            dateExists = true;
         }
      }

   } else if ((year >= -45 && year < 1582) || (year === 1582 && (month < 10 || (month === 10 && day <= 4)))) {
      calenderTypeInteger = 1; // Julian
      
      if (year % 4 === 0) {
         if (month === 2 && day > 29) {
            message = "Invalid date: February cannot have more than 29 days in a leap year.";
            dateExists = false;
         } else if (month === 2 && day <= 29) {
            message = "Valid date: February has 29 days in a leap year.";
            dateExists = true;
         }
         else if (day > 31) {
            message = "Invalid date: Month cannot have more than 31 days.";
            dateExists = false;
         } else if (day === 31) {
            if (month === 4 || month === 6 || month === 9 || month === 11) {
               message = "Invalid date: Month cannot have more than 30 days.";
               dateExists = false;
            } else {
               message = "Valid date: Month has 31 days.";
               dateExists = true;
            }
         } else {
            message = "Valid date";
            dateExists = true;
         }
      } else {
         if (month === 2 && day > 28) {
            message = "Invalid date: February cannot have more than 28 days in a non-leap year.";
            dateExists = false;
         } else if (month === 2 && day <= 28) {
            message = "Valid date: February has 28 days in a non-leap year.";
            dateExists = true;
         } else if (day > 31) {
            message = "Invalid date: Month cannot have more than 31 days.";
            dateExists = false;
         } else if (day === 31) {
            if (month === 4 || month === 6 || month === 9 || month === 11) {
               message = "Invalid date: Some months cannot have more than 31 days.";
               dateExists = false;
            } else {
               message = "Valid date: Month has 31 days.";
               dateExists = true;
            }
         } else {
            message = "Valid date";
            dateExists = true;
         }
      }

   } else if ((year > 1582) || (year === 1582 && month >= 10 && day >= 15)) {
      calenderTypeInteger = 2; // Gregorian

      // TODO: year 0 does not exist in Gregorian calendar, but it is not handled here. Sjekk oppgave tekst

      if (year === 0) {
         message = "Invalid date: Year 0 does not exist in the Gregorian calendar.";
         dateExists = false;
      }

      if (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) {
         if (month === 2 && day > 29) {
            message = "Invalid date: February cannot have more than 29 days in a leap year.";
            dateExists = false;
         } else if (month === 2 && day <= 29) {
            message = "Valid date: February has 29 days in a leap year.";
            dateExists = true;
         }
         else if (day > 31) {
            message = "Invalid date: Month cannot have more than 31 days.";
            dateExists = false;
         } else if (day === 31) {
            if (month === 4 || month === 6 || month === 9 || month === 11) {
               message = "Invalid date: Month cannot have more than 30 days.";
               dateExists = false;
            } else {
               message = "Valid date: Month has 31 days.";
               dateExists = true;
            }
         } else {
            message = "Valid date";
            dateExists = true;
         }
      } else {
         if (month === 2 && day > 28) {
            message = "Invalid date: February cannot have more than 28 days in a non-leap year.";
            dateExists = false;
         } else if (month === 2 && day <= 28) {
            message = "Valid date: February has 28 days in a non-leap year.";
            dateExists = true;
         } else if (day > 31) {
            message = "Invalid date: Month cannot have more than 31 days.";
            dateExists = false;
         } else if (day === 31) {
            if (month === 4 || month === 6 || month === 9 || month === 11) {
               message = "Invalid date: Month cannot have more than 30 days.";
               dateExists = false;
            } else {
               message = "Valid date: Month has 31 days.";
               dateExists = true;
            }
         } else {
            message = "Valid date";
            dateExists = true;
         }
      }
   } else {
      message = "Invalid date: The date does not exist in any calendar system.";
      const returnData: DateResponse = {
         Weekday: null,
         Calendar: null,
         Exists: false,
         Message: message,
      }

      return returnData;
   }

   // Determine the weekday using the Zeller's Congruence algorithm
   let weekdayInteger = null;
   let weekday = null;
   switch (calenderTypeInteger) {
      case 0: //Fictive
         weekdayInteger = (day + Math.floor((13 * (month + 1)) / 5) + year + Math.floor(year / 4) + 2) % 7;

         // Normalize to 0–6 range
         weekdayInteger = ((weekdayInteger % 7) + 7) % 7;
         weekday = mapFictiveWeekday(weekdayInteger);
         calenderType = FictiveCalendarCalendarSystemMap.Fictive;
         break;
      case 1: //Julian
         weekdayInteger = (day + Math.floor((13 * (month + 1)) / 5) + year + Math.floor(year / 4) + 5) % 7;
         weekdayInteger = ((weekdayInteger % 7) + 7) % 7;
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

   const returnData: DateResponse = {
      Weekday: dateExists ? weekday : FictiveCalendarCalendarSystemMap.Unknown,
      Calendar: dateExists ? calenderType : FictiveCalendarCalendarSystemMap.Unknown,
      Exists: dateExists,
      Message: message,
   };

   console.log("return data: ", returnData);

   return returnData;
}
