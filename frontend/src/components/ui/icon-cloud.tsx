"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },
  options: {
    reverse: true,
    depth: 0.6, // Tighter depth prevents hollow outer-ring gaps and distributes icons uniformly
    wheelZoom: false,
    imageScale: 1.8,
    activeCursor: "default",
    tooltip: "native",
    initial: [0.1, -0.1],
    clickToFront: 500,
    tooltipDelay: 0,
    outlineColour: "#0000",
    maxSpeed: 0.04,
    minSpeed: 0.02,
    minBrightness: 0.55, // Ensures back and middle icons remain visibly bright rather than fading into black
    maxBrightness: 1,
    freezeActive: false,
    shuffleTags: true,
  },
};

export const renderCustomIcon = (icon: SimpleIcon, theme: string = "dark") => {
  return renderSimpleIcon({
    icon,
    bgHex: "#000000",
    fallbackHex: "#00e676",
    minContrastRatio: 0, // Prevents darkening/suppression of colored AWS icons
    size: 46,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: any) => e.preventDefault(),
    },
  });
};

export type DynamicCloudProps = {
  iconSlugs?: string[];
  children?: React.ReactNode;
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export function IconCloud({ iconSlugs, children }: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);

  useEffect(() => {
    if (iconSlugs && iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;

    return Object.values(data.simpleIcons).map((icon) =>
      renderCustomIcon(icon, "dark")
    );
  }, [data]);

  return (
    <Cloud {...cloudProps} id="stable-icon-cloud">
      {children || renderedIcons}
    </Cloud>
  );
}