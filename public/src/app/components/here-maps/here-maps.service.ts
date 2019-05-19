import { Injectable } from '@angular/core';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class HereMapsService {

  appId = 'Y24GW4waR5Z72Hqxj3PT';
  appCode = '-coOP6S8RnEsWPuHwc9lHA';
  hereMapLoading: boolean;

  public queryCountry = 'Slovenija';
  public platform: any;
  public geocoder: any;
  public directions: any;
  public router: any;

  public constructor() {
    this.platform = new H.service.Platform({
      'app_id': this.appId,
      'app_code': this.appCode,
      'maxresults': 50,
      'country': 'SVN'
    });
    this.directions = [];
    this.router = this.platform.getRoutingService();
    this.geocoder = this.platform.getGeocodingService();
  }

  // Get coordinates for Location string query
  public getCoordinates(query: string) {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ searchText: query }, result => {
        if (result.Response.View.length > 0) {
          if (result.Response.View[0].Result.length > 0) {
            resolve(result.Response.View[0].Result);
          } else {
            reject({ message: 'No results found' });
          }
        } else {
          this.hereMapLoading = false;
          reject({ message: 'No results found' });
        }
      }, error => {
        reject(error);
      });
    });
  }

  // Get coordinates for Route from Start & Finish locations
  public getCoordinatesforRoute(queryStartLocation: string, queryFinishLocation: string) {
    const queryLocationStart = this.getCoordinates(queryStartLocation);
    const queryLocationFinish = this.getCoordinates(queryFinishLocation);

    return Promise.all([queryLocationStart, queryLocationFinish]).then(geocoderResult => {
      return geocoderResult;
    });
  }
}
