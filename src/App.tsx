import { Outlet } from "react-router-dom";
import CaseHeader from "./components/brand/CaseHeader";
import ScrollToTop from "./components/primitives/ScrollToTop";
import { IconSprite } from "./components/primitives/Icon";

export default function App() {
  return (
    <div className="min-h-screen">
      <IconSprite />
      <CaseHeader />
      <Outlet />
      <ScrollToTop />
    </div>
  );
}
