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
  const isYearValid = year >= -1000 && year <= 2030;

  const isFormValid = isDayValid && isMonthValid && isYearValid;

  const [weekday, setWeekday] = useState("");
  const [calenderType, setCalenderType] = useState("");
  const [dateExists, setDateExists] = useState("");
  
   useEffect(() => {
      const now = new Date();
      setDay(now.getDate());
      setMonth(now.getMonth() + 1); // Months are zero-based in JavaScript
      setYear(now.getFullYear());
     }, []);

   const handleSubmit = () => {
      const returnData: DateResponse = returnWeekday(day, month, year);
      console.log("Return data: ", returnData);
      setCalenderType(returnData.Calendar ?? "Unknown");
      setWeekday(returnData.Weekday ?? "Unknown");
      setDateExists(returnData.Exists ? "Yes" : "No");
      setMessage(returnData.Message);
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
              value={day}
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
              value={month}
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
              value={year}
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
        </div>
      </Card>
    </div>
  );
}