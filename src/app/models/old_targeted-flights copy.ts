import { DateRange } from "@angular/material/datepicker";
import { FlightsSelector } from "./flights-selector";

export class TargetedFlights{
    simpleJourney:boolean;
    origin: string;
    destinations: string[];
    departureDateRange:DateRange<Date>;
    returnDateRange:DateRange<Date>;
    constructor(selectedFlights : FlightsSelector){
       this.simpleJourney= selectedFlights.singleJourney;
       this.origin = selectedFlights.origin;
       this.destinations = selectedFlights.destinations;
       this.departureDateRange = this.dateRangeCalculator(selectedFlights.departure,selectedFlights.departureDateRange);
       this.returnDateRange = this.dateRangeCalculator(selectedFlights.arrival,selectedFlights.arrivalDateRange);
    }
    dateRangeCalculator(date: Date, variation: number) {
       const start = new Date(date);
       start.setDate(date.getDate() - variation - 1)
       const end = new Date(date);
       end.setDate(date.getDate() + variation + 1)
       return new DateRange(start, end);
    }
 }