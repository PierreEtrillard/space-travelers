import { Flight } from "./flight";

export interface FlightsGroup {
    origin:String;
destination:String;
goneFlights:Flight[];
returnFlights:Flight[];
}
