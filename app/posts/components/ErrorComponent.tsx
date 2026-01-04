"use client";

type ErrorProps = {
  error: string;
};

export const ErrorComponent = ({ error }: ErrorProps) => (
  <div className="">
    <p className="text-[crimson] text-center text-4xl">Error: {error}</p>
    <button onClick={() => location.reload()}>Reload</button>
  </div>
);
