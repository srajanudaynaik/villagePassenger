import api from "./api";

export const LocationService = {
  async searchPlaces(query) {
    const { data } = await api.get("/places", { params: { q: query } });
    return data.predictions || []; // Google-like response
  },

  async reverseGeocode(lat, lng) {
    const { data } = await api.get("/places/reverse", { params: { lat, lng } });
    return data.address;
  },
};