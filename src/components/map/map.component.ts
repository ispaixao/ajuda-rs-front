import { RegisterHelpService } from './../../core/services/register-help/register-help.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import L from 'leaflet';
import { InputSearchComponent } from '../input-search/input-search.component';
import { ShelterService } from './../../core/services/shelter/shelter.service';
import { Shelters } from '../../core/models/shelter/shelter';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
  imports: [InputSearchComponent, HttpClientModule],
  providers: [ShelterService, RegisterHelpService]
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: L.Map;
  markers: L.Marker[] = [
    L.marker([-30.052288, -51.177329]),
    L.marker([-30.052288, -51.077329]),
    L.marker([-30.052288, -51.087329]),
  ];

 private shelters!: Shelters

  constructor(private shelterService: ShelterService, private registerHelpService: RegisterHelpService) {}

  ngOnInit() {
    this.getAllShelters();
  }

  ngAfterViewInit() {
    this.initializeMap();
    this.addMarkers();
    this.centerMap();
  }

  latitude = -30.052288;
  longitude = -51.177329;

  zoomLevel = 13;

  private initializeMap() {
    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    this.map = L.map('map').setView(
      [this.latitude, this.longitude],
      this.zoomLevel
    );
    L.tileLayer(baseMapURl).addTo(this.map);
  }

  private addMarkers() {
    this.markers.forEach((marker) => marker.addTo(this.map));
  }

  private centerMap() {
    const bounds = L.latLngBounds(
      this.markers.map((marker) => marker.getLatLng())
    );

    this.map.fitBounds(bounds);
  }

  private getAllShelters(){
    this.shelterService.getAllShelters().subscribe((data: any) => {
      this.shelters = data.data;
    })
  }
}
