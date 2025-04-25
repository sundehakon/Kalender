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
   const isYearValid = year >= -1000 && year <= 2030 && year !== 0;

   const isFormValid = isDayValid && isMonthValid && isYearValid;

   const [weekday, setWeekday] = useState("");
   const [calenderType, setCalenderType] = useState("");
   const [dateExists, setDateExists] = useState("");
   const [calendarDays, setCalendarDays] = useState<(number | null)[][]>([]);

   useEffect(() => {
      const now = new Date();
      setDay(now.getDate());
      setMonth(now.getMonth() + 1); // Months start at 0 in js
      setYear(now.getFullYear());
   }, []);

   const generateCalendar = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
  
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = new Array(firstDay).fill(null);
  
    // Handle the special case for October 1582 (missing days between 4-15)
    if (year === 1582 && month === 10) {
      for (let day = 1; day <= daysInMonth; day++) {
        // Skip days 4 to 15, which are missing
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
      // Regular month, no special handling for missing days
      for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
    }
  
    // Push the last week if it contains any days
    if (week.length > 0) {
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
      
      generateCalendar(year, month); // Generate calendar after submitting
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
                     placeholder="Day"
                     id="day"
                     className="w-full"
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
                     placeholder="Month"
                     id="month"
                     className="w-full"
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
                     placeholder="Year"
                     id="year"
                     className="w-full"
                     min="-1000"
                     max="2030"
                     value={year === 0 ? "" : year}
                     onChange={(e) => setYear(Number(e.target.value))}
                  />
                  {!isYearValid && <p className="text-red-500 text-xs">Must be between -1000-2030</p>}
               </div>
               <Button
                  className="w-full"
                  variant="default"
                  disabled={!isFormValid}
                  onClick={handleSubmit}
               >
                  Submit
               </Button>

               <div className="flex flex-col gap-2 mt-4">
                  {weekday && <p className="text-sm">Weekday: {weekday}</p>}
                  {calenderType && <p className="text-sm">Calendar Type: {calenderType}</p>}
                  {dateExists && <p className="text-sm">Date Exists: {dateExists}</p>}
                  {message && <p className="text-sm">Message: {message}</p>}
               </div>

               {/* Calendar display */}
               <div className="mt-4">
                  <h3 className="text-center text-lg">Calendar for {month}/{year}</h3>
                  <div className="grid grid-cols-7 gap-2 text-center">
                     <div className="font-semibold">Sun</div>
                     <div className="font-semibold">Mon</div>
                     <div className="font-semibold">Tue</div>
                     <div className="font-semibold">Wed</div>
                     <div className="font-semibold">Thu</div>
                     <div className="font-semibold">Fri</div>
                     <div className="font-semibold">Sat</div>
                     
                     {calendarDays.map((week, weekIndex) => (
                        week.map((day, dayIndex) => (
                           <div key={`${weekIndex}-${dayIndex}`} className={`p-2 ${day ? "bg-gray-200" : ""}`}>
                              {day !== 0 ? day : ""}
                           </div>
                        ))
                     ))}
                  </div>
               </div>
            </div>
         </Card>
      </div>
   );
}
