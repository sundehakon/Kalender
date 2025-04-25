const fictiveCalendarWeekdayMap : Record<number, string> = {
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    7: "Saturday",
}

export default function mapFictiveCalendarWeekday(weekday: number): string {
    if (weekday < 0  || weekday > 6) {
        throw new Error("Invalid weekday number. Must be between 0 and 6.");
    }
    return fictiveCalendarWeekdayMap[weekday];
}