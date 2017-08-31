// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiEndPoint: "http://dev.tvt2.co.za",
  authEndPoint: "http://dev.tvt2.co.za/auth/login",
  registerEndPoint: "http://dev.tvt2.co.za/auth/register",
  logoutEndPoint: "http://dev.tvt2.co.za/auth/logout",
  activateEndPoint: "http://dev.tvt2.co.za/auth/activate",
  resetPasswordEndPoint: "http://dev.tvt2.co.za/auth/resetpassword",
  newPasswordEndPoint: "http://dev.tvt2.co.za/auth/newpassword",
  endpoint: {
    "contact": "http://dev.tvt2.co.za/contact",
    "bug-report": "http://dev.tvt2.co.za/contact/bugreport",
    "series-all": "http://dev.tvt2.co.za/series/all",
    "episodes-future": "http://dev.tvt2.co.za/episodes/future",
    "episodes-recent": "http://dev.tvt2.co.za/episodes/recent",
    "episodes-user-future": "http://dev.tvt2.co.za/episodes/user/future",
    "episodes-user-recent": "http://dev.tvt2.co.za/episodes/user/recent",
  },
  recaptchaScript: "https://www.google.com/recaptcha/api.js",
  recapchaKey: "6LcI3ygUAAAAAPwNo2dGuR9WryiXbJ16AhEiZJzz",
  firebase: {
    apiKey: "AIzaSyDtO3Dk6M67rcnUiWn5MmCtWrMk_ZHrpI8",
    authDomain: "tvtrackerv2.firebaseapp.com",
    databaseURL: "https://tvtrackerv2.firebaseio.com",
    projectId: "tvtrackerv2",
    storageBucket: "tvtrackerv2.appspot.com",
    messagingSenderId: "646419066300"
  }
};
