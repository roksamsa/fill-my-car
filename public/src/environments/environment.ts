// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA0D0sZDa4IGfdWBc_7TpQ84Vm3UCB3yvc',
    authDomain: 'fill-my-car.firebaseapp.com',
    databaseURL: 'https://fill-my-car.firebaseio.com',
    projectId: 'fill-my-car',
    storageBucket: 'fill-my-car.appspot.com',
    messagingSenderId: '787032903752'
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
