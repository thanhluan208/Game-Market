import axios from "axios";

export default axios.create({
  baseURL: "https://gamessportal.herokuapp.com/",
  // baseURL: "http://localhost:3004/",
});

