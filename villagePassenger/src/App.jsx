import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPhone from "./pages/AddPhone/AddPhone";
import Otp from "./pages/Otp/Otp";
import Language from "./pages/Language/Language";
import Home from "./pages/Home/Home";
import SearchLocation from "./pages/SearchLocation/SearchLocation";
import ConfirmRide from "./pages/ConfirmRide/ConfirmRide";
import FindingDrivers from "./pages/FindingDrivers/FindingDrivers";
import DriverList from "./pages/DriverList/DriverList";
import DriverDetails from "./pages/DriverDetails/DriverDetails";
import TrackRide from "./pages/TrackRide/TrackRide";
import Rating from "./pages/Rating/Rating";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddPhone />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/language" element={<Language />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-location" element={<SearchLocation />} />
        <Route path="/confirm-ride" element={<ConfirmRide />} />
        <Route path="/finding-drivers" element={<FindingDrivers />} />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/driver-details/:id" element={<DriverDetails />} />
        <Route path="/track-ride" element={<TrackRide />} />
        <Route path="/rating" element={<Rating />} />
      </Routes>
    </BrowserRouter>
  );
}
