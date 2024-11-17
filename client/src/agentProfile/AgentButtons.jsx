import React from "react";

// Shared animation keyframes
const styles = `
@keyframes shine {
  0% { background-position: 110% 0%, 0 0; }
  100% { background-position: -10% 0%, 0 0; }
}
`;

// Base style for metallic buttons
const baseButtonStyle = {
  color: "white",
  padding: "0.375rem 1.25rem", // py-1.5 px-5
  borderRadius: "0.5rem", // rounded-lg
  fontWeight: "600",
  display: "inline-block",
  animation: "shine 2s ease-in-out infinite alternate",
};

// Gold Button Component with more vibrant colors
const goldStyle = {
  ...baseButtonStyle,
  backgroundImage: `
    linear-gradient(to right, transparent 0%, transparent 45%, #ffffff 50%, transparent 55%, transparent 100%),
    linear-gradient(90deg, #f1b24a, #e5a02f, #d9890f, #c47409, #b36503, #f1d08d, #ffcb66)
  `,
  backgroundSize: "200% auto, auto",
  backgroundClip: "padding-box",
};

const GoldButton = () => (
  <h3 className="text-[16px]" style={goldStyle}>
    Gold
  </h3>
);

// Silver Button Component with more vibrant colors
const silverStyle = {
  ...baseButtonStyle,
  backgroundImage: `
    linear-gradient(to right, transparent 0%, transparent 45%, #ffffff 50%, transparent 55%, transparent 100%),
    linear-gradient(270deg, #b0b0b0, #9e9e9e, #8b8b8b, #787878, #696969, #e2e2e2)
  `,
  backgroundSize: "200% auto, auto",
  backgroundClip: "padding-box",
};

const SilverButton = () => (
  <h3 className="text-[16px]" style={silverStyle}>
    Silver
  </h3>
);

// Diamond Button Component with more vibrant colors
const diamondStyle = {
  ...baseButtonStyle,
  backgroundImage: `
    linear-gradient(to right, transparent 0%, transparent 45%, #ffffff 50%, transparent 55%, transparent 100%),
    linear-gradient(90deg, #a2e4f2, #8ad5f0, #74c7e8, #5ebae2, #d0f7ff, #b4f0ff)
  `,
  backgroundSize: "200% auto, auto",
  backgroundClip: "padding-box",
};

const DiamondButton = () => (
  <h3 className="text-[16px]" style={diamondStyle}>
    Diamond
  </h3>
);

// Parent Component to display all buttons
const AgentButtons = ({ type }) => {
  return (
    <div className="flex flex-col items-start gap-3 pb-5">
      <style>{styles}</style> {/* Inject keyframes */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-semibold">Agent:</span>
        {type == "silver" ? (
            <SilverButton />
        ) : type == "gold" ? (
            <GoldButton />
        ) : (
          type == "diamond" && <DiamondButton />
        )}
      </div>
    </div>
  );
};

export default AgentButtons;
