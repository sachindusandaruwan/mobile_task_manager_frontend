import { store } from "../store/store";
import { refreshToken } from "../slice/userSlice";
import setupApi from "./setupApi";

// Reuse the base axios instance
const api = setupApi;

// Request interceptor → attach JWT if available
api.interceptors.request.use(
    (config) => {
        if (!config.url?.startsWith("/auth")) {
            const jwtToken = store.getState().userReducer.jwtToken;
            if (jwtToken) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${jwtToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor → handle token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshTok = store.getState().userReducer.refreshToken;
            if (!refreshTok) {
                return Promise.reject(error);
            }

            try {
                // unwrap() gives the payload directly (instead of action object)
                const refreshed = await store.dispatch(refreshToken(refreshTok)).unwrap();

                if (refreshed?.accessToken) {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${refreshed.accessToken}`;
                    return api(originalRequest); // retry request with new token
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
