"use client";

import React, { useState } from "react";

export type ServiceId = "integration" | "cloud" | "development" | "consultancy";

interface LayerSpec {
  id: ServiceId;
  code: string;
  label: string;
  layerName: string;
  summary: string;
  throughput: string;
  protocols: string[];
  nodes: string[];
}

const LAYERS: LayerSpec[] = [
  {
    id: "integration",
    code: "LYR-01",
    label: "Platform Integration",
    layerName: "Event Bus & API Interoperability",
    summary:
      "Connects fragmented ERPs, payment gateways, and internal data stores through idempotent webhook pipelines and unified API gateways.",
    throughput: "99.98% delivery · Zero duplicate writes",
    protocols: ["REST / GraphQL", "Webhook Queues", "Change Data Capture", "OAuth2 / mTLS"],
    nodes: ["Legacy ERP / CRM", "Event Router", "Schema Validator", "Unified API"],
  },
  {
    id: "cloud",
    code: "LYR-02",
    label: "Cloud Deployment",
    layerName: "Multi-Zone Cloud & Edge Infrastructure",
    summary:
      "Migrates and hardens production workloads across Google Cloud, DigitalOcean, and Cloudflare Workers with automated rollbacks and IaC.",
    throughput: "< 45ms APAC Edge · Zero-downtime deploys",
    protocols: ["Google Cloud", "DigitalOcean", "Cloudflare Edge", "Docker / IaC"],
    nodes: ["Edge WAF / CDN", "Container Cluster", "Managed Postgres", "Automated Backup"],
  },
  {
    id: "development",
    code: "LYR-03",
    label: "Solutions Development",
    layerName: "Custom Production Software & Portals",
    summary:
      "Engineers full-stack web applications, operational dashboards, and high-concurrency backend services tailored to your domain workflows.",
    throughput: "Strict TypeScript · End-to-end tested",
    protocols: ["Next.js / React 19", "Node / Workers", "PostgreSQL", "Automated CI/CD"],
    nodes: ["Client App", "Domain Service", "Relational Store", "Audit Telemetry"],
  },
  {
    id: "consultancy",
    code: "LYR-04",
    label: "IT Consultancy",
    layerName: "Architecture Audits, Security & FinOps",
    summary:
      "Reviews system bottlenecks, cloud spend, and security posture to deliver actionable engineering roadmaps and hands-on remediation.",
    throughput: "Senior-led · Direct engineering access",
    protocols: ["Architecture Review", "Cloud FinOps", "Security Hardening", "SLA Planning"],
    nodes: ["System Audit", "Risk Matrix", "Cost Model", "Execution Roadmap"],
  },
];

export default function ArchitectureBlueprint() {
  const [activeId, setActiveId] = useState<ServiceId>("integration");

  const activeLayer = LAYERS.find((layer) => layer.id === activeId) ?? LAYERS[0];

  const handleScopeLayer = (serviceId: ServiceId) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("justbecause:select-service", { detail: { service: serviceId } }),
      );
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative rounded-2xl border border-slate-800/90 bg-[#0D131C]/95 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.85)] overflow-hidden">
      {/* Top schematic header bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800/90 bg-[#070A0F]/80">
        <div className="flex items-center gap-2.5">
          <span className="inline-block w-2 h-2 rounded-full bg-[#2DD4BF]" />
          <span className="font-mono text-xs tracking-wider uppercase text-slate-300">
            SYS.TOPOLOGY // INTERACTIVE BLUEPRINT
          </span>
        </div>
        <span className="font-mono text-[11px] text-slate-400">MNL-PH · REV 2026.4</span>
      </div>

      {/* Layer selector tabs */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-800/80 bg-[#090E16]"
        role="tablist"
        aria-label="System architecture layers"
      >
        {LAYERS.map((layer) => {
          const isActive = layer.id === activeId;
          return (
            <button
              key={layer.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(layer.id)}
              className={`px-3.5 py-3 text-left border-r border-b sm:border-b-0 last:border-r-0 border-slate-800/70 transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#111926] text-white border-t-2 border-t-[#38BDF8]"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
              }`}
            >
              <div className="font-mono text-[10px] tracking-widest uppercase text-[#38BDF8]">
                {layer.code}
              </div>
              <div className="text-xs font-semibold mt-0.5 truncate">{layer.label}</div>
            </button>
          );
        })}
      </div>

      {/* Schematic Diagram Viewport */}
      <div className="p-5 sm:p-6 blueprint-subgrid relative">
        {/* Visual node pipeline */}
        <div className="relative rounded-xl border border-slate-800/90 bg-[#070A0F]/90 p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] uppercase tracking-wider text-[#38BDF8]">
              {activeLayer.code} — {activeLayer.layerName}
            </span>
            <span className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              ACTIVE PATH
            </span>
          </div>

          {/* 4-Node Architectural Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 relative">
            {activeLayer.nodes.map((node, idx) => (
              <div
                key={node}
                className="relative rounded-lg border border-slate-800 bg-[#0D131C] p-3 flex flex-col justify-between group hover:border-[#38BDF8]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-slate-400">N0{idx + 1}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                </div>
                <div className="text-xs font-medium text-slate-100 leading-snug">{node}</div>
              </div>
            ))}
          </div>

          {/* SVG Bus Connector Diagram */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>INGEST &amp; VALIDATION</span>
            <svg
              className="w-24 sm:w-36 h-3 text-[#38BDF8]"
              viewBox="0 0 140 12"
              fill="none"
              aria-hidden="true"
            >
              <line
                x1="0"
                y1="6"
                x2="132"
                y2="6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <path
                d="M130 2L136 6L130 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#2DD4BF]">PRODUCTION SLA</span>
          </div>
        </div>

        {/* Specification Details */}
        <div className="mt-5 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{activeLayer.summary}</p>

          <div className="flex flex-wrap gap-1.5">
            {activeLayer.protocols.map((protocol) => (
              <span
                key={protocol}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#111926] text-slate-200 border border-slate-800"
              >
                {protocol}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="font-mono text-xs text-slate-400">
              <span className="text-slate-500">SPEC // </span>
              <span className="text-slate-200">{activeLayer.throughput}</span>
            </div>

            <button
              type="button"
              onClick={() => handleScopeLayer(activeLayer.id)}
              className="inline-flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-[#38BDF8] hover:text-[#2DD4BF] transition-colors cursor-pointer self-start sm:self-auto"
            >
              <span>Scope {activeLayer.label}</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
        </div>
      </div>
    </div>
  );
}
