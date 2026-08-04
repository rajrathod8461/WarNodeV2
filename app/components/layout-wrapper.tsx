'use client';

import { useState, useEffect } from "react";
import uiConfig from "../config/sections/ui.json";
import type { UIConfig } from "../types/ui";

const config = uiConfig as UIConfig;

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#05060a]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#137fec]" />
          <div className="absolute inset-2 rounded-full bg-[#137fec]/10 blur-md" />
        </div>
        <span className="orbitron-font text-lg tracking-wide text-white">
          War<span className="text-[#137fec]">Nodes</span>
        </span>
      </div>
    </div>
  )
}

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(config.loading.enableLoadingScreen);

  useEffect(() => {
    if (config.loading.enableLoadingScreen) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, config.loading.loadingDuration);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      {isLoading && config.loading.enableLoadingScreen && <LoadingScreen />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}
