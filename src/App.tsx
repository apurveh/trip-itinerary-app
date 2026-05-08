import { Outlet } from "react-router-dom";
import CaseHeader from "./components/brand/CaseHeader";
import ScrollToTop from "./components/primitives/ScrollToTop";

export default function App() {
  return (
    <div className="min-h-screen">
      <CaseHeader />
      <Outlet />
      <ScrollToTop />
    </div>
  );
}
