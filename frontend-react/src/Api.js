import axios from "axios";

let baseURL = import.meta.env.PROD ? "https://calenderapp-production.up.railway.app" : "http://localhost:3000";

const Api = axios.create({
  baseURL,
  //   timeout: 1000,
  //   headers: { "X-Custom-Header": "foobar" },
});

export default Api;
