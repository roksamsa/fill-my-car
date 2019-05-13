import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

const mapBoxToken = 'pk.eyJ1Ijoicm9rc2Ftc2EiLCJhIjoiY2p2OG5nOW9pMGdqYjQwcGYwZHVqdTRtcCJ9.IMNFrJwAlUTvKNhl_luspw';

(mapboxgl as any).accessToken = mapBoxToken;

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss']
})

export class MapBoxComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('mapBox') mapBox: ElementRef;
  map: mapboxgl.Map;

  directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    maxZoom: 10,
    minZoom: 10,
    zoom: 5,
    showCompass: true,
    showUserLocation: true,
    controls: {
      inputs: true,
      instructions: false,
      profileSwitcher: false
    }
  });

  @Input() mapBoxFromDestination: String;
  @Input() mapBoxToDestination: String;

  constructor() { }

  startLocation = this.directions.setOrigin([14.1425, 32.63638889]);
  endLocation = this.directions.setOrigin([14.1425, 32.63638889]);

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: this.mapBox.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      zoom: 4,
      minZoom: 4,
      maxZoom: 16,
      hash: true,
      scrollZoom: true,
      doubleClickZoom: true,
      renderWorldCopies: false,
      center: [14.98117, 46.12577],
    }).addControl(this.directions, 'top-left');
    this.directions.setOrigin(this.mapBoxFromDestination);
    this.directions.setDestination(this.mapBoxToDestination);
    console.log(this.mapBoxFromDestination);
    console.log(this.mapBoxToDestination);
  }

  ngAfterViewInit() {
    /*this.directions.forwardGeocode({
      query: this.mapBoxFromDestination,
      countries: ['si']
    })
    .send()
    .then(response => {
      const match = response.body;
      console.log(match);
      this.directions.setOrigin(match);
      this.directions.setDestination(this.mapBoxToDestination);
    });*/
  }

  ngOnChanges() {
  }
}
