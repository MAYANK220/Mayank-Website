import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import EndingOverlay from "@/components/EndingOverlay";

export default function Home() {
  return (
    <main className="w-full bg-[#0f0f0f] min-h-screen relative">
      <ScrollyCanvas />
      <Projects />
      <EndingOverlay />
    </main>
  );
}
