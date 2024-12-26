import { JourneyDateRange } from './journey-date-range';

export interface DestinationSelection {
  departureDateRange: JourneyDateRange;
  arrivalDateRange: JourneyDateRange;
  selectedOrigin: string;
  selectedDestinations: string[];
}
