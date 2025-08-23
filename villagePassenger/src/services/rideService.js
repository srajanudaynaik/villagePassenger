import api from "./api";

export const RideService = {
  async fetchNearbyDrivers(pickup) {
    const { data } = await api.get("/drivers/nearby", { params: pickup });
    return data;
  },

  async createRide(body) {
    // body = {pickup, drop, vehicleType}
    const { data } = await api.post("/rides", body);
    return data;
  },

  async fetchRideStatus(rideId) {
    const { data } = await api.get(`/rides/${rideId}`);
    return data;
  },

  async completeRide(rideId) {
    const { data } = await api.patch(`/rides/${rideId}/complete`);
    return data;
  },

  async rateRide(rideId, rating, review) {
    const { data } = await api.post(`/rides/${rideId}/rate`, { rating, review });
    return data;
  },
};