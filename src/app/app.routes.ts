import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FlightComponent } from "./flights/flight/flight.component";
import { FlightsComponent } from "./flights/flights.component";
import { NotFoundComponent } from "./not-found/not-found.component";


export const routes:Routes=[
    {path:"", component:DashboardComponent},
    {path:"flights", component:FlightsComponent},
    {path:"flights/flight/:id", component:FlightComponent},
    {path:"**", component:NotFoundComponent},
];