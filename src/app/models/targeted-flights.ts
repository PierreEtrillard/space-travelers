import { DateRange } from "@angular/material/datepicker";
export interface TargetedFlights{
   class: string,
   passengers: number,
   origin: string,
   destinations: string[],
   singleJourney: boolean,
   departureDateRange:DateRange<Date> | null,
   arrivalDateRange:DateRange<Date> | null,
 }