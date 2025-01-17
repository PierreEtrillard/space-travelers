import { Aircraft } from './aircraft';
import { Destination } from './destination';

interface StopOver {
  location: Destination;
  departure: Date;
  arrival: Date;
}
export interface Flight {
  id: string;
  origin: Destination;
  destination: Destination;
  aircraft: Aircraft;
  remainingEcoPlaces: number;
  remainingBuisnessPlaces: number;
  remainingFirstClassPlaces: number;
  ticketEcoPrice: number;
  ticketBusinessPrice: number;
  ticketPremiumPrice: number;
  departure: Date;
  arrival: Date;
  stopOvers: StopOver[];
}
