import { Component, AfterViewInit, Input, ViewChild, ElementRef, OnChanges, AfterViewChecked } from '@angular/core';
import { HereMapsService } from './here-maps.service';
import { ConstantsService } from '../../common/services/constants.service';

declare var H: any;

@Component({
  selector: 'app-here-maps',
  templateUrl: './here-maps.component.html',
  styleUrls: ['./here-maps.component.scss']
})

export class HereMapsComponent implements AfterViewInit, AfterViewChecked, OnChanges {
  private map: any;
  preloadingSpinnerVisibility = true;
  hereMapUI: any;
  hereMapRouteStartLat: any;
  hereMapRouteStartLng: any;
  hereMapRouteFinishLat: any;
  hereMapRouteFinishLng: any;
  hereMapDefaultBounds = new H.geo.Rect(42.3736, -71.0751, 42.3472, -71.0408);
  hereMapStartMarkerIcon = new H.map.Icon('assets/icons/icon-map-start-pin.svg', { size: { w: 18, h: 18 } });
  hereMapFinishMarkerIcon = new H.map.Icon('assets/icons/icon-map-finish-pin.svg', { anchor: { x: 20, y: 36 } });

  public hereMapRouteDistance: number;
  public hereMapRouteTravelHours: number;
  public hereMapRouteTravelMinutes: number;
  private hereMapRouteTravelTime: number;

  // Link: https://www.eea.europa.eu/highlights/average-co2-emissions-from-new
  // Link: http://shrinkthatfootprint.com/calculate-your-carbon-footprint
  private averageVehicleCO2emissions = 121.5 / 1000; // 121.5 g we divide with 1000, so we get kg
  private hereMapRouteVehicleCO2emissions: number;

  @ViewChild('hereMaps') mapElement: ElementRef;
  @ViewChild('hereMapsContainer') hereMapsContainer: ElementRef;

  @Input() hereMapCenterLAT: any = '50.1120423728813';
  @Input() hereMapCenterLNG: any = '8.68340740740811';
  @Input() hereMapStart: any;
  @Input() hereMapFinish: any;
  @Input() showRouteDetails: boolean;

  constructor(public hereMap: HereMapsService,
              public constant: ConstantsService) {
  }

  ngAfterViewInit() {
    this.hereMapInitialSetup();
  }

  ngAfterViewChecked() {
    this.map.getViewPort().resize();
  }

  ngOnChanges() {
    this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);
  }

  hereMapInitialSetup() {
    const defaultLayers = this.hereMap.platform.createDefaultLayers();
    defaultLayers.normal.map.setMin(2);

    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map, {
        zoom: 10,
        center: {
          lat: this.hereMapCenterLAT,
          lng: this.hereMapCenterLNG
        },
        pixelRatio: window.devicePixelRatio || 1
      }
    );

    const mapEvents = new H.mapevents.MapEvents(this.map);
    const behavior = new H.mapevents.Behavior(mapEvents);
    this.hereMapUI = H.ui.UI.createDefault(this.map, defaultLayers);
    this.map.setCenter({ lat: 46.119944, lng: 14.815333 }); // Center is GEOSS Slovenije
    this.map.setZoom(7.2);
    this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);

    // Add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => this.map.getViewPort().resize());
  }

  hereMapsRoute(start: string, finish: string) {
    if (start !== '' || finish !== '') {
      this.hereMap.getCoordinates(start).then(geocoderResult1 => {
        this.hereMapRouteStartLat = geocoderResult1[0].Location.DisplayPosition.Latitude;
        this.hereMapRouteStartLng = geocoderResult1[0].Location.DisplayPosition.Longitude;

        if (this.map != null && this.map.getObjects() != null) {
          this.map.removeObjects(this.map.getObjects());
        }

        // Start marker
        const startMarker = new H.map.Marker({
          lat: this.hereMapRouteStartLat,
          lng: this.hereMapRouteStartLng
        }, { icon: this.hereMapStartMarkerIcon });

        this.map.addObject(startMarker);
        this.map.setCenter({ lat: this.hereMapRouteStartLat, lng: this.hereMapRouteStartLng });

        this.hereMap.getCoordinates(finish).then(geocoderResult2 => {
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
            'routeattributes': 'summary',
            'departure': 'Now',
            'language ': 'sl-sl',
            'country': 'SVN',
            'metricSystem': 'metric'
          };

          this.hereMap.router.calculateRoute(routeParameters, data => {
            const route = data.response.route[0];

            if (route) {
              this.preloadingSpinnerVisibility = false;
              this.hereMap.directions = route.leg[0].maneuver;
              data = route;

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
              this.getRouteSummaryData(route.summary);
            } else {
              this.preloadingSpinnerVisibility = true;
            }
          }, error => {
            console.log(error);
          });

        });

      });
    }
  }

  public getRouteSummaryData(summary: any): void {
    this.hereMapRouteDistance = this.constant.roundNumber(summary.distance / 1000, 0, 'up'); // 1000 is number for Km, as 1000m is 1Km
    this.hereMapRouteTravelTime = this.constant.roundNumber(summary.travelTime / 60, 0, 'up'); // 1000 is number for Km, as 1000m is 1Km
    this.hereMapRouteTravelHours = this.constant.roundNumber(this.hereMapRouteTravelTime / 60, 0, 'down');
    this.hereMapRouteTravelMinutes = this.hereMapRouteTravelTime % 60;
    // Route distance divided by average vehicle CO2 emissions and in the end multiplied with 1000, so we get kg from g
    this.hereMapRouteVehicleCO2emissions =
      this.constant.roundNumber(this.hereMapRouteDistance * this.averageVehicleCO2emissions, 0, 'down');
  }
}
