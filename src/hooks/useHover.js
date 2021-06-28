import React from "react";

export default function useHover() {
    const [isHovered, setIsHovered] = React.useState(false);
    const on = () => setIsHovered(true);
    const off = () => setIsHovered(false);
    return { isHovered, on, off };
  }