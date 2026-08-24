"use client";

import React from "react";

const CIRCLE_CIRCUMFERENCE = 283;

interface CircularProgressTimerProps {
  expiresAt: Date;
  totalDuration: number;
  onExpire?: () => void;
  size?: number;
  strokeColor?: string;
  strokeWidth?: number;
}

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const calculateTimeLeft = (expiresAt: Date) => {
  const diff = Math.max(0, Math.floor((expiresAt.getTime() - Date.now()) / 1000));
  return diff;
};

export const CircularProgressTimer = ({
  expiresAt,
  totalDuration,
  onExpire,
  size = 140,
  strokeColor = "#FFA726",
  strokeWidth = 3,
}: CircularProgressTimerProps) => {
  const [timeLeft, setTimeLeft] = React.useState(() => calculateTimeLeft(expiresAt));

  React.useEffect(() => {
    setTimeLeft(calculateTimeLeft(expiresAt));
  }, [expiresAt]);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      onExpire?.();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onExpire]);

  const progress = ((totalDuration - timeLeft) / totalDuration) * CIRCLE_CIRCUMFERENCE;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={CIRCLE_CIRCUMFERENCE}
          strokeDashoffset={CIRCLE_CIRCUMFERENCE - progress}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center bg-orange-80 rounded-full m-4">
        <span className="text-[18px] font-inter font-[400] text-foreground-101">
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
};
