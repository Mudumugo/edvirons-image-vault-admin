
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#D3E4FD] via-[#E5DEFF] to-[#FDE1D3] px-4">
      <div className="bg-white/80 dark:bg-background glass shadow-lg rounded-2xl max-w-xl w-full p-8 md:p-12 flex flex-col items-center text-center animate-fade-in mx-auto">
        {/* Edvirons Registry Logo */}
        <div className="w-20 h-20 rounded-full shadow-lg bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center mb-4">
          <span className="text-5xl font-extrabold text-white select-none drop-shadow">
            ER
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-primary tracking-tight">
          Edvirons Registry
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          A secure and elegant image vault & registry platform for modern institutions. Easily manage, track, and renew licenses for your clients from a unified dashboard.
        </p>
        <Button
          size="lg"
          className="mt-1 px-8 text-base font-semibold shadow hover-scale"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </Button>
        <div className="mt-8">
          <img
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80"
            alt="Laptop on table"
            className="rounded-xl w-full max-w-md object-cover shadow-lg mx-auto border-2 border-card"
            style={{ aspectRatio: "16/9" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;

