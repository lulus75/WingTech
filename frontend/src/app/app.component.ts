import { Component, OnInit } from '@angular/core';
import { ParcelService } from './services/parcels.service';
import { ParcelInterface} from "./interfaces/ParcelInterface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  parcels : ParcelInterface[] = [];
  total: number = 0;

  constructor(private parcelService: ParcelService) {}

  ngOnInit() {
    this.parcelService.getParcels().subscribe(data => {
      this.parcels = data.parcels;
      this.total = data.total;
    });
  }

}
