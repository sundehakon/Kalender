const fictiveCalendarWeekdayMap : Record<number, string> = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
}

export default function mapFictiveCalendarWeekday(weekday: number): string {
    if (weekday < 0 || weekday > 6) {
        throw new Error("Invalid weekday number. Must be between 0 and 6.");
    }
    return fictiveCalendarWeekdayMap[weekday];
}