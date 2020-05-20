// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyA0D0sZDa4IGfdWBc_7TpQ84Vm3UCB3yvc',
    authDomain: 'fill-my-car.firebaseapp.com',
    databaseURL: 'https://fill-my-car.firebaseio.com',
    projectId: 'fill-my-car',
    storageBucket: 'fill-my-car.appspot.com',
    messagingSenderId: '787032903752'
  },
  auth: {
    clientID: 'uTkc54l5oO2ONJT96RA2Mh6Suq4lZ6hW',
    domain: 'fill-my-car.eu.auth0.com', // e.g., https://you.auth0.com/
    audience: 'https://fill-my-car.eu.auth0.com/api/v2/', // e.g., http://localhost:3001
    redirect: 'https://napolnimojavto.si/',
    callbackURL: 'https://napolnimojavto.si/',
    scope: 'openid profile email',
    secret: 'Ve8DaHrQk1nNDZSyAooNE8Czm5yLhczPLqkHtPcSnkjXnMeWBgjqpPcVB48yLdaS'
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
