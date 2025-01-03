import { Component } from '@angular/core';
import { SelectorPannelComponent } from "./selector-pannel/selector-pannel/selector-pannel.component";
import { FlightsGridComponent } from "./flights-grid/flights-grid.component";
import { HeaderUtilService } from '../services/header-util.service';

@Component({
  selector: 'app-flights',
  standalone: true,
  imports: [SelectorPannelComponent, FlightsGridComponent],
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss'
})
export class FlightsComponent {
constructor(private headerService:HeaderUtilService){
  
}
}
