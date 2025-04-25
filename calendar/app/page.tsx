"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import returnWeekday from "@/utils/returnWeekday";
import { Card } from "@/components/ui/card";
import DateResponse from "@/types/dateResponse";

export default function Home() {
  const [formDay, setFormDay] = useState<number>(1);
  const [formMonth, setFormMonth] = useState<number>(1);
  const [formYear, setFormYear] = useState<number>(2000);
  
  const [day, setDay] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(2000);
  const [message, setMessage] = useState<string>("Valid date");

  const isDayValid = formDay >= 1 && formDay <= 31;
  const isMonthValid = formMonth >= 1 && formMonth <= 12;
  const isYearValid = formYear >= -1000 && formYear <= 2030 && formYear !== 0;

  const isFormValid = isDayValid && isMonthValid && isYearValid;

  const [weekday, setWeekday] = useState("");
  const [calenderType, setCalenderType] = useState("");
  const [dateExists, setDateExists] = useState("");

  const [monthDays, setMonthDays] = useState<number[]>([]);
  const [startWeekday, setStartWeekday] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    
    setFormDay(currentDay);
    setFormMonth(currentMonth);
    setFormYear(currentYear);
    setDay(currentDay);
    setMonth(currentMonth);
    setYear(currentYear);
  }, []);

  const handleSubmit = () => {
    setDay(formDay);
    setMonth(formMonth);
    setYear(formYear);
    
    const returnData: DateResponse = returnWeekday(formDay, formMonth, formYear);
    console.log("Return data: ", returnData);
    setCalenderType(returnData.Calendar ?? "Unknown");
    setWeekday(returnData.Weekday ?? "Unknown");
    setDateExists(returnData.Exists ? "Yes" : "No");
    setMessage(returnData.Message);

    generateMonthCalendar(formYear, formMonth);
  };

  const generateMonthCalendar = (year: number, month: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setMonthDays(daysArray);

    const firstDayOfMonth = new Date(year, month - 1, 1).getDay(); 
    setStartWeekday(firstDayOfMonth);
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
              value={formDay === 0 ? "" : formDay}
              onChange={(e) => setFormDay(Number(e.target.value))}
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
              value={formMonth === 0 ? "" : formMonth}
              onChange={(e) => setFormMonth(Number(e.target.value))}
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
              value={formYear === 0 ? "" : formYear}
              onChange={(e) => setFormYear(Number(e.target.value))}
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
          {monthDays.length > 0 && (
            <div className="mt-4">
              <p className="text-center text-lg font-semibold mb-2">
                {`Month Calendar for ${month}/${year}`}
              </p>
              <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((weekday) => (
                  <div
                    key={weekday}
                    className="font-semibold text-center text-sm border-b pb-2"
                  >
                    {weekday}
                  </div>
                ))}
                {Array.from({ length: startWeekday }).map((_, index) => (
                  <div key={`empty-${index}`} className="text-center text-sm"></div>
                ))}
                {monthDays.map((calendarDay) => (
                  <div
                    key={calendarDay}
                    className={`border rounded p-2 text-center text-sm ${
                      calendarDay === day ? "bg-blue-500 text-white font-bold" : "border-gray-300"
                    }`}
                  >
                    {calendarDay}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}