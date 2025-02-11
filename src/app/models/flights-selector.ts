export interface FlightsSelector {
  class: string;
  passengers: number;
  origin: string;
  destinations: string[];
  singleJourney: boolean;
  departureDate: Date|null;
  departureVariation: number;
  returnDate: Date|null;
  returnVariation: number;
}
