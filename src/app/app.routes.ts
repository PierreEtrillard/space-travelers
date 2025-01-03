import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FlightsComponent } from "./flights/flights.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { FlightComponent } from "./flights/flight/flight.component";


export const routes:Routes=[
    {path:"", component:DashboardComponent},
    {path:"flights", component:FlightsComponent},
    {path:"flights/flight/:id", component:FlightComponent},
    {path:"**", component:NotFoundComponent},
];