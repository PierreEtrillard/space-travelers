import { Routes } from "@angular/router";
import { FlightsComponent } from "./app/flights/flights.component";
import { FlightComponent } from "./app/flights/flight/flight.component";
import { NotFoundComponent } from "./app/not-found/not-found.component";
import { DashboardComponent } from "./app/dashboard/dashboard.component";

export const routes:Routes=[
    {path:"", component:DashboardComponent},
    {path:"flights", component:FlightsComponent},
    {path:"flights/flight/:id", component:FlightComponent},
    {path:"**", component:NotFoundComponent},
];