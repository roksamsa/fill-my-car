import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare var H: any;

@Injectable({
  providedIn: 'root'
})
export class HereMapsService {

  appId = 'Y24GW4waR5Z72Hqxj3PT';
  appCode = '-coOP6S8RnEsWPuHwc9lHA';

  private hereMapsLoadingState = new BehaviorSubject(false);
  hereMapLoading = this.hereMapsLoadingState.asObservable();

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

  isHereMapsLoading(hereMapsLoading: boolean) {
    this.hereMapsLoadingState.next(hereMapsLoading);
  }

  // Get coordinates for Location string query
  public getCoordinates(query: string) {
    return new Promise((resolve, reject) => {
      const searchQuery = query;
      this.geocoder.geocode({ searchText: query }, result => {
        console.log(searchQuery);
        console.log(result);
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

  // Get coordinates for Route from Start & Finish locations
  public getCoordinatesforRoute(queryStartLocation: string, queryFinishLocation: string) {
    this.getCoordinates(queryStartLocation).then(geocoderResult1 => {
      return geocoderResult1;
    });
    /*const queryLocationStart = this.getCoordinates(queryStartLocation);
    const queryLocationFinish = this.getCoordinates(queryFinishLocation);*/

    /*if (queryLocationStart && !queryLocationFinish) {
      return queryLocationStart.then(geocoderResult => {
        console.log(geocoderResult);
        return geocoderResult;
      });
    } else if (!queryLocationStart && queryLocationFinish) {
      return queryLocationFinish.then(geocoderResult => {
        console.log(geocoderResult);
        return geocoderResult;
      });
    } else {
      return Promise.all([queryLocationStart, queryLocationFinish]).then(geocoderResult => {
        console.log(geocoderResult);
        return geocoderResult;
      });
    }*/

    /*return Promise.all([queryLocationStart, queryLocationFinish]).then(geocoderResult => {
      console.log(geocoderResult);
      return geocoderResult;
    });*/
  }
}
