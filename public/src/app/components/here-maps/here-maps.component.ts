import { Component, OnInit, AfterViewInit, OnChanges, Input, ViewChild, ElementRef, SimpleChanges } from '@angular/core';
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
  hereMapStartMarkerIcon = new H.map.Icon('assets/icons/icon-map-start-pin.svg', { size: { w: 18, h: 18 } });
  hereMapFinishMarkerIcon = new H.map.Icon('assets/icons/icon-map-finish-pin.svg', { anchor: { x: 20, y: 36 } });

  @ViewChild('hereMaps') mapElement: ElementRef;
  @Input() hereMapCenterLAT: any = '50.1120423728813';
  @Input() hereMapCenterLNG: any = '8.68340740740811';
  @Input() hereMapStart: any;
  @Input() hereMapFinish: any;

  constructor(public hereMap: HereMapsService) {
    this.hereMap.isHereMapsLoading(true);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    const defaultLayers = this.hereMap.platform.createDefaultLayers();
    defaultLayers.normal.map.setMin(2);
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
    this.map.setCenter({ lat: 46.119944, lng: 14.815333 }); // Center is GEOSS
    this.map.setZoom(7.2);
    setTimeout(() => {
      this.hereMap.isHereMapsLoading(false);
    }, 1000);
  }

  ngOnChanges() {
    this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);
    this.hereMap.isHereMapsLoading(true);

    setTimeout(() => {
      this.hereMap.isHereMapsLoading(false);
    }, 1000);
  }

  hereMapsRoute(start: string, finish: string) {
    if (start !== '' || finish !== '') {
      if (this.map.getObjects()) {
        this.map.removeObjects(this.map.getObjects());
      }
      this.hereMap.getCoordinates(start).then(geocoderResult1 => {
        this.hereMapRouteStartLat = geocoderResult1[0].Location.DisplayPosition.Latitude;
        this.hereMapRouteStartLng = geocoderResult1[0].Location.DisplayPosition.Longitude;

        // Start marker
        const startMarker = new H.map.Marker({
          lat: this.hereMapRouteStartLat,
          lng: this.hereMapRouteStartLng
        }, { icon: this.hereMapStartMarkerIcon });

        this.map.addObject(startMarker);
        this.map.setCenter({ lat: this.hereMapRouteStartLat, lng: this.hereMapRouteStartLng });

        this.hereMap.getCoordinates(finish).then(geocoderResult2 => {
          console.log(geocoderResult2[0].Location.DisplayPosition.Latitude);
          console.log(start);
          this.hereMapRouteFinishLat = geocoderResult2[0].Location.DisplayPosition.Latitude;
          this.hereMapRouteFinishLng = geocoderResult2[0].Location.DisplayPosition.Longitude;

          // Finish marker
          const finishMarker = new H.map.Marker({
            lat: this.hereMapRouteFinishLat,
            lng: this.hereMapRouteFinishLng
          }, { icon: this.hereMapFinishMarkerIcon });

          this.map.addObject(finishMarker);

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

              this.map.addObject(routeLine);
              this.map.setViewBounds(routeLine.getBounds());
            } else {
              this.hereMap.isHereMapsLoading(true);
            }
          }, error => {
            console.log(error);
          });

        });

      });

      /*this.hereMap.getCoordinatesforRoute(start, finish).then(geocoderResult => {
        console.log(start);
        this.hereMapRouteStartLat = geocoderResult[0][0].Location.DisplayPosition.Latitude;
        this.hereMapRouteStartLng = geocoderResult[0][0].Location.DisplayPosition.Longitude;
        this.hereMapRouteFinishLat = geocoderResult[1][0].Location.DisplayPosition.Latitude;
        this.hereMapRouteFinishLng = geocoderResult[1][0].Location.DisplayPosition.Longitude;

        // Start marker
        const startMarker = new H.map.Marker({
          lat: this.hereMapRouteStartLat,
          lng: this.hereMapRouteStartLng
        }, { icon: this.hereMapStartMarkerIcon });

        // Finish marker
        const finishMarker = new H.map.Marker({
          lat: this.hereMapRouteFinishLat,
          lng: this.hereMapRouteFinishLng
        }, { icon: this.hereMapFinishMarkerIcon });

        this.map.addObject(startMarker);
        this.map.addObject(finishMarker);

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

            this.map.addObject(routeLine);
            this.map.setViewBounds(routeLine.getBounds());
          } else {
            this.hereMap.isHereMapsLoading(true);
          }
        }, error => {
          console.log(error);
        });
      });
    } else {
      console.log('Iskanje po zemljevidu še ni pognano.');
    }*/
    }
  }
}
