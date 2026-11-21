import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Diwali from "./pages/Diwali.jsx";
import Trip from "./pages/Trip.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Diwali />} />
        <Route path="/trip" element={<Trip />} />
      </Routes>
    </>
  );
}
