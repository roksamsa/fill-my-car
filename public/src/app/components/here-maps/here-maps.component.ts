import { Component, OnInit, AfterViewInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { HereMapsService } from './here-maps.service';

declare var H: any;

@Component({
  selector: 'app-here-maps',
  templateUrl: './here-maps.component.html',
  styleUrls: ['./here-maps.component.scss']
})

export class HereMapsComponent implements OnInit, AfterViewInit, OnChanges {

  private map: any;
  hereMapRouteStartLatLng: any;
  hereMapRouteFinishLatLng: any;
  defaultBounds = new H.geo.Rect(42.3736, -71.0751, 42.3472, -71.0408);

  @ViewChild('hereMaps') mapElement: ElementRef;
  @Input() hereMapCenterLAT: any = '50.1120423728813';
  @Input() hereMapCenterLNG: any = '8.68340740740811';
  @Input() hereMapStart: any;
  @Input() hereMapFinish: any;

  constructor(public hereMap: HereMapsService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const defaultLayers = this.hereMap.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map, {
        zoom: 10,
        center: {
          lat: this.hereMapCenterLAT,
          lng: this.hereMapCenterLNG
        }
      }
    );
    const mapUI = H.ui.UI.createDefault(this.map, defaultLayers);
    const mapEvents = new H.mapevents.MapEvents(this.map);
    const behavior = new H.mapevents.Behavior(mapEvents);
  }

  ngOnChanges() {
    this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);
  }

  hereMapsRoute(start: string, finish: string) {
    if (start !== '' || finish !== '') {
      if (this.map) {
        this.map.removeObjects(this.map.getObjects());
      }
      this.hereMap.getCoordinatesforRoute(start, finish).then(geocoderResult => {
        this.hereMapRouteStartLatLng =
          geocoderResult[0][0].Location.DisplayPosition.Latitude + ',' + geocoderResult[0][0].Location.DisplayPosition.Longitude;

        this.hereMapRouteFinishLatLng =
          geocoderResult[1][0].Location.DisplayPosition.Latitude + ',' + geocoderResult[1][0].Location.DisplayPosition.Longitude;

        const routeParameters = {
          'mode': 'fastest;car;traffic:enabled',
          'waypoint0': 'geo!' + this.hereMapRouteStartLatLng,
          'waypoint1': 'geo!' + this.hereMapRouteFinishLatLng,
          'representation': 'display',
          'departure': 'Now',
          'language ': 'sl-sl',
          'country ': 'SVN'
        };

        this.hereMap.router.calculateRoute(routeParameters, data => {
          if (data.response) {
            this.hereMap.directions = data.response.route[0].leg[0].maneuver;
            data = data.response.route[0];
            const lineString = new H.geo.LineString();
            data.shape.forEach(point => {
              const parts = point.split(',');
              lineString.pushLatLngAlt(parts[0], parts[1]);
            });
            const routeLine = new H.map.Polyline(lineString, {
              style: { strokeColor: '#D93362', lineWidth: 7 }
            });
            const startMarker = new H.map.Marker({
              lat: this.hereMapRouteStartLatLng.split(',')[0],
              lng: this.hereMapRouteStartLatLng.split(',')[1]
            });
            const finishMarker = new H.map.Marker({
              lat: this.hereMapRouteFinishLatLng.split(',')[0],
              lng: this.hereMapRouteFinishLatLng.split(',')[1]
            });
            this.map.addObjects([startMarker, finishMarker, routeLine]);
            this.map.setViewBounds(routeLine.getBounds());
          }
        }, error => {
          console.error(error);
        });
      });
    } else {
      if (this.map) {
        this.map.removeObjects(this.map.getObjects());
        this.map.setViewBounds(this.defaultBounds.getBounds());
      }
    }
  }

  moveMapToBerlin(map) {
    map = this.map;
    map.setCenter({ lat: 52.5159, lng: 13.3777 });
    map.setZoom(14);
  }
}
