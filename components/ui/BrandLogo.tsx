"use client";

import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "light" | "dark" | "monochrome";
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
}

export function BrandLogo({
  className = "",
  variant = "dark",
  size = "md",
  showSubtitle = true,
}: BrandLogoProps) {
  const isLight = variant === "light";
  
  const textColor = isLight ? "#FFFFFF" : "#573820";
  const subtextColor = isLight ? "#D8C7B5" : "#8C6B52";
  const accentColor = "#B77B63";
  const petalColor = isLight ? "#F5EFE6" : "#7A4E2D";

  const sizeStyles = {
    sm: { icon: 28, title: "text-lg", sub: "text-[8px]" },
    md: { icon: 38, title: "text-2xl sm:text-3xl", sub: "text-[9px] sm:text-[10px]" },
    lg: { icon: 52, title: "text-3xl sm:text-4xl", sub: "text-xs" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 ${className}`}>
      {/* Luxury Organic Cotton Blossom Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={sizeStyles.icon}
          height={sizeStyles.icon}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Circular outer subtle ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeDasharray="3 3"
            strokeOpacity={isLight ? "0.4" : "0.6"}
          />
          
          {/* Inner ring */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={accentColor}
            strokeWidth="0.8"
            strokeOpacity={isLight ? "0.3" : "0.4"}
          />

          {/* Organic Cotton Boll Blossom Petals (Muslin flower) */}
          {/* Top Petal */}
          <path
            d="M50 20C44 28 42 36 50 44C58 36 56 28 50 20Z"
            fill={accentColor}
            fillOpacity="0.85"
          />
          {/* Bottom Petal */}
          <path
            d="M50 72C44 64 42 56 50 48C58 56 56 64 50 72Z"
            fill={accentColor}
            fillOpacity="0.85"
          />
          {/* Left Petal */}
          <path
            d="M24 46C32 40 40 42 48 50C40 58 32 60 24 46Z"
            fill={petalColor}
            fillOpacity="0.9"
          />
          {/* Right Petal */}
          <path
            d="M76 46C68 40 60 42 52 50C60 58 68 60 76 46Z"
            fill={petalColor}
            fillOpacity="0.9"
          />

          {/* Calyx & Protective Swaddle Leaf Arc */}
          <path
            d="M32 68C40 76 60 76 68 68C62 72 38 72 32 68Z"
            fill={accentColor}
          />
          {/* Central Pure Core Dot */}
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" />
          <circle cx="50" cy="50" r="2.5" fill={accentColor} />
        </svg>
      </div>

      {/* Brand Name & Typography */}
      <div className="flex flex-col text-left leading-none">
        <span
          className={`font-serif ${sizeStyles.title} tracking-wider font-semibold group-hover:text-[#B77B63] transition-colors whitespace-nowrap`}
          style={{ color: textColor }}
        >
          RANJI TEXTILES
        </span>
        {showSubtitle && (
          <span
            className={`uppercase tracking-[0.22em] font-medium mt-1 whitespace-nowrap ${sizeStyles.sub}`}
            style={{ color: subtextColor }}
          >
            Tiruppur • Muslin Babywear
          </span>
        )}
      </div>
    </div>
  );
}
