import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";

import roomApi, { RoomApi } from "./routes/room";

// interface ApiError {
//   non_field_errors?: string[];
// }

class ClientApi {
  // Declare Api routes
  public readonly room: RoomApi;

  constructor(private readonly httpClient: AxiosInstance) {
    /**
     * Intercept httpClientt Request and check access token. If there's a token, add this to the headers
     */
    this.httpClient.interceptors.request.use((request) => {
      // if (this._ln) {
      //   request.headers.set("Accept-Language", this._ln);
      // }

      // if (this._token) {
      //   request.headers.set("Authorization", `Bearer ${this._token}`);
      // }
      return request;
    });

    /**
     * Intercept httpClientt Response and check error status code.
     */

    // this.httpClientt.interceptors.response.use(
    //   (res) => res,
    //   async (error: AxiosError<ApiError>) => {
    //     if (error.response?.data?.non_field_errors?.[0]) {
    //       error.message = error.response?.data?.non_field_errors?.[0];
    //     }

    //     if (error?.response?.status === 401) {
    //       await storageService.removeItem("token");
    //       this.token = "";
    //     }

    //     throw error;
    //   }
    // );

    /**
     * initialize API routes
     */
    this.room = roomApi(this.httpClient);
  }
}

const baseURL =
  "https://veehiveprod.uaenorth.cloudapp.azure.com/pdf/summarizer/";

const clientApi = new ClientApi(
  axios.create({
    baseURL,
  })
);

export const TEST_USER_ID = "993366";

export default clientApi;
