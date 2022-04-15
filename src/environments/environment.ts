// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //local host ASP.NET Core url
  baseUrl:"https://localhost:44377/api/v1/route/",

  //localhost Function App url
  //baseUrl:"http://localhost:7071/api/ReachDestinationAPI",

  //Function App Backend  URL
  //baseUrl:"https://reachdestinationtestingapi.azurewebsites.net/api/ReachDestinationAPI",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
