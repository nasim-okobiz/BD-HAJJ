import React from "react";

const silverBackgroundEffect = {
  color: "white",
  backgroundImage: `
    linear-gradient(to right, transparent 0%, transparent 45%, white 50%, transparent 55%, transparent 100%),
    linear-gradient(270deg, #8c8c8c 1.3%, #999 15%, #868686 29.6%, #828282 29.6%, #7d7d7d 31.8%, #797979 31.8%, #6a6a6a 38.9%, #d3d3d3)
  `,
  backgroundPosition: "110% 0%, 0 0",
  backgroundSize: "200% auto, auto",
  WebkitBackgroundClip: "padding-box",  // Apply to background only
  backgroundClip: "padding-box",
  animation: "shine 2s ease-in-out infinite alternate",  // Continuous shine
  padding: "0.375rem 1.25rem",  // Tailwind equivalent: py-1.5 px-5
  borderRadius: "0.5rem",  // Tailwind equivalent: rounded-lg
  fontWeight: "600",
  display: "inline-block",  // Ensure the style wraps only content
};

const styles = `
@keyframes shine {
  0% { background-position: 110% 0%, 0 0; }
  100% { background-position: -10% 0%, 0 0; }
}
`;

const AgentCard = () => {
  return (
    <div className="flex items-center gap-3 pb-5">
      <style>{styles}</style> {/* Inject keyframes */}
      <span className="text-lg font-semibold">Agent: </span>
      <h3 style={silverBackgroundEffect}>
        Silver
      </h3>
    </div>
  );
};

export default AgentCard;
