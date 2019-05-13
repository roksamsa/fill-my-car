import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges, Input, ViewChild, ElementRef } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

declare var H: any;

@Component({
  selector: 'app-here-maps',
  templateUrl: './here-maps.component.html',
  styleUrls: ['./here-maps.component.scss']
})

export class HereMapsComponent implements OnInit, AfterViewInit, OnChanges {

  appId = 'Y24GW4waR5Z72Hqxj3PT';
  appCode = '-coOP6S8RnEsWPuHwc9lHA';

  private platform: any;
  private map: any;
  private router: any;
  private geocoder: any;
  public directions: any;
  private hereMapRouteLatLng: any;
  hereMapRouteStartLatLng: any;
  hereMapRouteFinishLatLng: any;

  @ViewChild('hereMaps') mapElement: ElementRef;
  @Input() hereMapCenterLAT: any = '50.1120423728813';
  @Input() hereMapCenterLNG: any = '8.68340740740811';
  @Input() hereMapStart: any = 'Ljubljana, Slovenija';
  @Input() hereMapFinish: any = 'Koper, Slovenija';

  constructor() { }

  ngOnInit() {
    this.platform = new H.service.Platform({
      'app_id': this.appId,
      'app_code': this.appCode
    });
    this.directions = [];
    this.router = this.platform.getRoutingService();
    this.geocoder = this.platform.getGeocodingService();

    this.getCoordinates(this.hereMapStart).then(geocoderResult => {
      this.hereMapRouteStartLatLng =
      geocoderResult[0].Location.DisplayPosition.Latitude + ',' + geocoderResult[0].Location.DisplayPosition.Longitude;
    });

    this.getCoordinates(this.hereMapFinish).then(geocoderResult => {
      this.hereMapRouteFinishLatLng =
      geocoderResult[0].Location.DisplayPosition.Latitude + ',' + geocoderResult[0].Location.DisplayPosition.Longitude;
    });
  }

  ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
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
    this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);
    console.log(this.hereMapRouteStartLatLng);
    console.log(this.hereMapRouteFinishLatLng);
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes['start'] && !changes['start'].isFirstChange()) || (changes['finish'] && !changes['finish'].isFirstChange())) {
      this.hereMapsRoute(this.hereMapStart, this.hereMapFinish);
    }
  }

  public hereMapsRoute(start: any, finish: any) {
    const params = {
      'mode': 'fastest;car;traffic:enabled',
      'waypoint0': 'geo!' + this.hereMapRouteStartLatLng,
      'waypoint1': 'geo!' + this.hereMapRouteFinishLatLng,
      'representation': 'display',
      'departure': 'Now'
    };
    if (this.map.getObjects()) {
      this.map.removeObjects(this.map.getObjects());
    }
    this.router.calculateRoute(params, data => {
      console.log(data);
      if (data.response) {
        this.directions = data.response.route[0].leg[0].maneuver;
        data = data.response.route[0];
        const lineString = new H.geo.LineString();
        data.shape.forEach(point => {
          const parts = point.split(',');
          lineString.pushLatLngAlt(parts[0], parts[1]);
        });
        const routeLine = new H.map.Polyline(lineString, {
          style: { strokeColor: '#242B61', lineWidth: 5 }
        });
        this.getCoordinates(start).then(geocoderResult1 => {
          this.getCoordinates(finish).then(geocoderResult2 => {
            this.hereMapRouteStartLatLng =
            geocoderResult1[0].Location.DisplayPosition.Latitude + ',' + geocoderResult1[0].Location.DisplayPosition.Longitude;
            this.hereMapRouteFinishLatLng =
            geocoderResult2[0].Location.DisplayPosition.Latitude + ',' + geocoderResult2[0].Location.DisplayPosition.Longitude;
            const startMarker = new H.map.Marker({
              lat: this.hereMapRouteStartLatLng.split(',')[0],
              lng: this.hereMapRouteStartLatLng.split(',')[1]
            });
            const finishMarker = new H.map.Marker({
              lat: this.hereMapRouteFinishLatLng.split(',')[0],
              lng: this.hereMapRouteFinishLatLng.split(',')[1]
            });
            this.map.addObjects([routeLine, startMarker, finishMarker]);
          });
        });
        this.map.setViewBounds(routeLine.getBounds());
      }
    }, error => {
      console.error(error);
    });
  }

  private getCoordinates(query: string) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ searchText: query }, result => {
        if (result.Response.View.length > 0) {
          if (result.Response.View[0].Result.length > 0) {
            resolve(result.Response.View[0].Result);
          } else {
            reject({ message: 'No results found' });
          }
        } else {
          reject({ message: 'No results found' });
        }
      }, error => {
        reject(error);
      });
    });
  }

  /*private getCoordinatesforRoute(queryStartLocation: string, queryFinishLocation: string) {
    const queryLocationStart = new Promise((resolve, reject) => {
      this.geocoder.geocode({ searchText: queryStartLocation }, result1 => {
        if (result1.Response.View.length > 0) {
          resolve (result1.Response.View[0].Result);
        } else {
          reject({ message: 'No results found' });
        }
      }, error => {
        reject(error);
      });
    });
    const queryLocationFinish = new Promise((resolve, reject) => {
      this.geocoder.geocode({ searchText: queryFinishLocation }, result2 => {
        if (result2.Response.View.length > 0) {
          resolve (result2.Response.View[0].Result);
        } else {
          reject({ message: 'No results found' });
        }
      }, error => {
        reject(error);
      });
    });
    const queryRoute = {queryLocationStart, queryLocationFinish};
    console.log(queryLocationStart);
    console.log(queryLocationFinish);
    console.log(queryRoute);
    return queryRoute;
  }
*/
  moveMapToBerlin(map) {
    map = this.map;
    map.setCenter({ lat: 52.5159, lng: 13.3777 });
    map.setZoom(14);
  }
}
