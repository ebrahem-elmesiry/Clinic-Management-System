"use client";

import React from "react";

interface WrapperComponentProps {
  children: React.ReactNode;
  className?: string;
}

export default function WrapperComponent({ children, className }: WrapperComponentProps) {
  return <div className={className ?? ""}>{children}</div>;
}
