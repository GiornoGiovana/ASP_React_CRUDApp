const API_URL_DEVELOPMENT = "https://localhost:7086";
const API_URL_PRODUCTION = "https://appname.azurewebsites.net";

//prettier-ignore
const Constants = process.env.NODE_ENV === "development" ? API_URL_DEVELOPMENT : API_URL_PRODUCTION;

export default Constants;
