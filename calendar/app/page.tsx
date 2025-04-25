"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import returnWeekday from "@/utils/returnWeekday";
import { Card } from "@/components/ui/card";
import DateResponse from "@/types/dateResponse";

export default function Home() {
   const [day, setDay] = useState<number>(1);
   const [month, setMonth] = useState<number>(1);
   const [year, setYear] = useState<number>(2000);
   const [message, setMessage] = useState<string>("Valid date");

   const isDayValid = day >= 1 && day <= 31;
   const isMonthValid = month >= 1 && month <= 12;
   const isYearValid = year >= -1000 && year <= 5000 && year !== 0;

   const isFormValid = isDayValid && isMonthValid && isYearValid;

   const [weekday, setWeekday] = useState("");
   const [calenderType, setCalenderType] = useState("");
   const [dateExists, setDateExists] = useState("");
   const [calendarDays, setCalendarDays] = useState<(number | null)[][]>([]);

   useEffect(() => {
      const now = new Date();
      setDay(now.getDate());
      setMonth(now.getMonth() + 1);
      setYear(now.getFullYear());
   }, []);

   const generateCalendar = (year: number, month: number) => {
      const firstDay = new Date(year, month - 1, 1).getDay();
      const daysInMonth = new Date(year, month, 0).getDate();

      const weeks: (number | null)[][] = [];
      let week: (number | null)[] = new Array(firstDay).fill(null);

      if (year === 1582 && month === 10) {
         for (let day = 1; day <= daysInMonth; day++) {
            if (day > 4 && day < 15) {
               week.push(null);
            } else {
               week.push(day);
            }

            if (week.length === 7) {
               weeks.push(week);
               week = [];
            }
         }
      } else {
         for (let day = 1; day <= daysInMonth; day++) {
            week.push(day);
            if (week.length === 7) {
               weeks.push(week);
               week = [];
            }
         }
      }

      if (week.length > 0) {
         while (week.length < 7) {
            week.push(null);
         }
         weeks.push(week);
      }

      setCalendarDays(weeks);
   };

   const handleSubmit = () => {
      const returnData: DateResponse = returnWeekday(day, month, year);
      setCalenderType(returnData.Calendar ?? "Unknown");
      setWeekday(returnData.Weekday ?? "Unknown");
      setDateExists(returnData.Exists ? "Yes" : "No");
      setMessage(returnData.Message);

      generateCalendar(year, month);
   };

   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <Card className="p-8 shadow-lg rounded-lg bg-white w-full max-w-md">
            <p className="text-center text-lg font-semibold mb-4">Calendar</p>
            <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-2">
                  <Label htmlFor="day">Day</Label>
                  <Input
                     type="number"
                     id="day"
                     min="1"
                     max="31"
                     value={day === 0 ? "" : day}
                     onChange={(e) => setDay(Number(e.target.value))}
                  />
                  {!isDayValid && <p className="text-red-500 text-xs">Must be between 1-31</p>}
               </div>
               <div className="flex flex-col gap-2">
                  <Label htmlFor="month">Month</Label>
                  <Input
                     type="number"
                     id="month"
                     min="1"
                     max="12"
                     value={month === 0 ? "" : month}
                     onChange={(e) => setMonth(Number(e.target.value))}
                  />
                  {!isMonthValid && <p className="text-red-500 text-xs">Must be between 1-12</p>}
               </div>
               <div className="flex flex-col gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                     type="number"
                     id="year"
                     min="-1000"
                     max="5000"
                     value={year === 0 ? "" : year}
                     onChange={(e) => setYear(Number(e.target.value))}
                  />
                  {!isYearValid && (
                     <p className="text-red-500 text-xs">Must be between -1000 and 5000, excluding 0</p>
                  )}
               </div>
               <Button
                  className="w-full"
                  variant="default"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
               >
                  Submit
               </Button>

               {/* Results */}
               <div className="flex flex-col gap-2 mt-4">
                  {weekday && <p className="text-sm">Weekday: {weekday}</p>}
                  {calenderType && <p className="text-sm">Calendar Type: {calenderType}</p>}
                  {dateExists && <p className="text-sm">Date Exists: {dateExists}</p>}
                  {message && <p className="text-sm">Message: {message}</p>}
               </div>

               {/* Calendar */}
               {calendarDays.length > 0 && (
                  <div className="mt-4">
                     <h3 className="text-center text-lg font-semibold mb-2">
                        Calendar for {month}/{year}
                     </h3>
                     <div className="grid grid-cols-7 gap-2 text-center">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
                           <div key={dayName} className="font-semibold">
                              {dayName}
                           </div>
                        ))}
                        {calendarDays.map((week, weekIndex) =>
                          week.map((calendarDay, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className={`border rounded p-2 text-center text-sm ${
                                calendarDay === day
                                  ? "bg-blue-500 text-white font-bold"
                                  : calendarDay
                                  ? "bg-gray-200"
                                  : "white"
                              }`}
                            >
                              {calendarDay ?? ""}
                            </div>
                          ))
                        )}
                     </div>
                  </div>
               )}
            </div>
         </Card>
      </div>
   );
}
