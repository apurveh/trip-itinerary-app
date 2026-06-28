import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { loadTrip } from "@/lib/loadTrip";
import TripHero from "@/components/trip/TripHero";
import DayIndex from "@/components/trip/DayIndex";
import BudgetSection from "@/components/trip/BudgetSection";
import PracticalInfo from "@/components/trip/PracticalInfo";
import MemoriesSection from "@/components/trip/MemoriesSection";
import BackToHub from "@/components/trip/BackToHub";
import StatusBanner from "@/components/trip/StatusBanner";

export default function Trip() {
  const { slug = "turin" } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const trip = loadTrip(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!trip) {
    return (
      <main className="case-container" style={{ padding: "80px 0" }}>
        <h1 className="t-display" style={{ fontSize: 64 }}>
          CASE FILE NOT FOUND
        </h1>
        <p className="t-typewriter">No dossier exists for "{slug}".</p>
        <button className="btn" onClick={() => navigate("/")} style={{ marginTop: 20 }}>
          ← FILING CABINET
        </button>
      </main>
    );
  }

  const onBack = () => navigate("/");

  return (
    <main>
      <TripHero trip={trip} onBack={onBack} />
      <StatusBanner trip={trip} />
      <DayIndex trip={trip} />
      <BudgetSection trip={trip} />
      <PracticalInfo trip={trip} />
      <MemoriesSection />
      <BackToHub onBack={onBack} />
    </main>
  );
}
