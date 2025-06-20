// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// tslint:disable-next-line: no-any
export const environment: any = {
	production: false,
	firebase: {
		apiKey: "AIzaSyA-VhhxaTRKaLORwbkliTZy7-GdS49rHHc",
		authDomain: "expenseout-fcm.firebaseapp.com",
		databaseURL: "expenseout-fcm",
		projectId: "expenseout-fcm",
		storageBucket: "expenseout-fcm.appspot.com",
		messagingSenderId: "1038768521260",
		appId: "1:1038768521260:web:33d6313540855b3f635189",
		measurementId: "G-C54PFRKTNP"
	  },
	BACKEND_URL: 'http://localhost/Expense/Application/index.php',
	// BACKEND_URL: 'https://wallet.infinitisoftware.net/index.php',
	ENCRYPTION_KEY: 'infiniti',
	DECRYPTION_KEY: 'infiniti',
	logger: true,
	networkError: false,
	invalidAccessAlert : false,
	userName : 'expenseout',
	pwd :'exp@123',
	aypPath :'https://livefe.atyourprice.net/index.php'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
