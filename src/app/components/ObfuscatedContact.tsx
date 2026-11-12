"use client";

import React, { useSyncExternalStore } from "react";

interface ObfuscatedContactProps {
  email?: string;
  tel?: string;
  className?: string;
}

const emptySubscribe = () => () => {};

export default function ObfuscatedContact({
  email,
  tel,
  className = "",
}: Readonly<ObfuscatedContactProps>) {
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const value = email || tel || "";
  const reversed = value.split("").reverse().join("");

  if (!hydrated) {
    return (
      <span
        className={className}
        style={{ unicodeBidi: "bidi-override", direction: "rtl" }}
        aria-label="Protected contact detail"
      >
        {reversed}
      </span>
    );
  }

  const href = email ? `mailto:${email}` : tel ? `tel:${tel.replace(/\s+/g, "")}` : "#";

  return (
    <a href={href} className={`underline-offset-4 hover:underline ${className}`}>
      {value}
    </a>
  );
}
