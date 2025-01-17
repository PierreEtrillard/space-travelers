export interface FlightsSelector {
  class: string;
  passengers: number;
  origin: string;
  destinations: string[];
  singleJourney: boolean;
  departure: Date;
  departureDateRange: number;
  arrival: Date;
  arrivalDateRange: number;
}
