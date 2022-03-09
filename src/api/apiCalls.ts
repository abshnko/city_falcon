import axios from "axios";

export const getAll = (languages: any, order: string) =>
  axios.get(
    `https://cf-endpoint-proxy.herokuapp.com/webapi/v1/stories?limit=20&order=${order}&languages=${languages.join(
      ","
    )}`
  );
