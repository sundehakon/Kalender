import { FictiveCalendarCalendarSystemMap } from './fictiveCalendarCalendarSystemMap';
export default class DateResponse {
	Weekday!: string | null;
    Calendar!: FictiveCalendarCalendarSystemMap | null;
	Exists!: boolean;
	Message!: string;
}