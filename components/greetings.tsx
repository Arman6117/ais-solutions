import React from "react";

const Greetings = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center gap-2 max--52">
      <h1 className="font-semibold text-5xl">
        Hello, <span className="font-thin">{children} 👋</span>
      </h1>
    </div>
  );
};

export default Greetings;
