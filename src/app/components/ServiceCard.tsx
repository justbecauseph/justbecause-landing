"use client";

import React from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
  layerTag?: string;
  serviceKey?: string;
  deliverables?: string[];
  outcome?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = React.memo(
  ({ title, description, icon, index = 0, layerTag, serviceKey, deliverables = [], outcome }) => {
    const handleScopeClick = () => {
      if (typeof window !== "undefined") {
        if (serviceKey) {
          window.dispatchEvent(
            new CustomEvent("justbecause:select-service", {
              detail: { service: serviceKey },
            }),
          );
        }
        const contactEl = document.getElementById("contact");
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    return (
      <article
        className={`group relative flex flex-col justify-between rounded-2xl bg-[#0D131C] border border-slate-800/90 hover:border-[#38BDF8]/50 transition-all duration-300 p-7 sm:p-8 overflow-hidden service-card-delay-${index}`}
      >
        {/* Top subtle accent rule on hover */}
        <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#38BDF8] via-[#2DD4BF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div
              className="w-12 h-12 rounded-xl bg-[#111926] border border-slate-800 group-hover:border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] transition-colors duration-200"
              aria-hidden="true"
            >
              {icon}
            </div>
            {layerTag ? (
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 px-2.5 py-1 rounded-md bg-[#070A0F] border border-slate-800/80">
                {layerTag}
              </span>
            ) : null}
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-[#38BDF8] transition-colors duration-200">
            {title}
          </h3>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">{description}</p>

          {deliverables.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-6">
              {deliverables.map((item) => (
                <span
                  key={item}
                  className="font-mono text-xs text-slate-300 bg-[#111926] border border-slate-800/90 px-2.5 py-1 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between gap-4">
          {outcome ? (
            <span className="font-mono text-xs text-slate-400">{outcome}</span>
          ) : (
            <span className="font-mono text-xs text-slate-400">Production-grade delivery</span>
          )}

          <button
            type="button"
            onClick={handleScopeClick}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#38BDF8] hover:text-[#2DD4BF] transition-colors cursor-pointer shrink-0"
          >
            <span>Scope</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8H13M13 8L9 4M13 8L9 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </article>
    );
  },
);

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
