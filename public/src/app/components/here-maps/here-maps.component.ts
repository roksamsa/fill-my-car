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
  hereMapUI: any;
  hereMapRouteStartLat: any;
  hereMapRouteStartLng: any;
  hereMapRouteFinishLat: any;
  hereMapRouteFinishLng: any;
  hereMapDefaultBounds = new H.geo.Rect(42.3736, -71.0751, 42.3472, -71.0408);

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

    const mapEvents = new H.mapevents.MapEvents(this.map);
    const behavior = new H.mapevents.Behavior(mapEvents);
    this.hereMapUI = H.ui.UI.createDefault(this.map, defaultLayers);
    this.map.setCenter({lat: 46.119944, lng: 14.815333}); // Center is GEOSS
    this.map.setZoom(7.2);
  }

  ngOnChanges() {
    this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);
  }

  hereMapsRoute(start: string, finish: string) {
    if (start !== '' || finish !== '') {
      if (this.map.getObjects()) {
        this.map.removeObjects(this.map.getObjects());
      }
      this.hereMap.getCoordinatesforRoute(start, finish).then(geocoderResult => {
        this.hereMapRouteStartLat = geocoderResult[0][0].Location.DisplayPosition.Latitude;
        this.hereMapRouteStartLng = geocoderResult[0][0].Location.DisplayPosition.Longitude;
        this.hereMapRouteFinishLat = geocoderResult[1][0].Location.DisplayPosition.Latitude;
        this.hereMapRouteFinishLng = geocoderResult[1][0].Location.DisplayPosition.Longitude;

        console.log(this.hereMapRouteStartLat + ',' + this.hereMapRouteStartLng);
        console.log(this.hereMapRouteFinishLat + ',' + this.hereMapRouteFinishLng);

        const routeParameters = {
          'mode': 'fastest;car;traffic:enabled',
          'waypoint0': 'geo!' + this.hereMapRouteStartLat + ',' + this.hereMapRouteStartLng,
          'waypoint1': 'geo!' + this.hereMapRouteFinishLat + ',' + this.hereMapRouteFinishLng,
          'representation': 'display',
          'departure': 'Now',
          'language ': 'sl-sl',
          'country': 'SVN',
          'metricSystem': 'metric'
        };

        this.hereMap.router.calculateRoute(routeParameters, data => {
          if (data.response) {
            this.hereMap.isHereMapsLoading(false);
            this.hereMap.directions = data.response.route[0].leg[0].maneuver;
            data = data.response.route[0];
            const lineString = new H.geo.LineString();
            data.shape.forEach(point => {
              const parts = point.split(',');
              lineString.pushLatLngAlt(parts[0], parts[1]);
            });
            const routeLine = new H.map.Polyline(lineString, {
              style: {
                strokeColor: 'rgba(217, 51, 98, .75)',
                lineWidth: 8,
                lineCap: 'round'
              }
            });

            const startMarkerIcon = new H.map.Icon('assets/icons/icon-map-start-pin.svg', {size: {w: 18, h: 18}});
            const finishMarkerIcon = new H.map.Icon('assets/icons/icon-map-finish-pin.svg', {anchor: {x: 20, y: 36}});

            const startMarker = new H.map.Marker({
              lat: this.hereMapRouteStartLat,
              lng: this.hereMapRouteStartLng
            }, {icon: startMarkerIcon});

            const finishMarker = new H.map.Marker({
              lat: this.hereMapRouteFinishLat,
              lng: this.hereMapRouteFinishLng
            }, {icon: finishMarkerIcon});
            this.map.addObjects([startMarker, finishMarker, routeLine]);
            this.map.setViewBounds(routeLine.getBounds());
          } else {
            this.hereMap.isHereMapsLoading(true);
          }
        }, error => {
          console.error(error);
        });
      });
    } else {
      if (this.map) {
        this.map.removeObjects(this.map.getObjects());
        this.map.setViewBounds(this.hereMapDefaultBounds.getBounds());
      }
    }
  }

  moveMapToBerlin(map) {
    map = this.map;
    map.setCenter({ lat: 52.5159, lng: 13.3777 });
    map.setZoom(14);
  }
}
