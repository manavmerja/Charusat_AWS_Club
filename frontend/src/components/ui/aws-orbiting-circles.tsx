"use client";

import React, { useEffect, useState } from "react";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { fetchSimpleIcons } from "react-icon-cloud";

const customColors: Record<string, string> = {
  amazonwebservices: "#FF9900",
  awslambda: "#FF9900",
  amazonec2: "#FF9900",
  amazoneks: "#FF9900",
  awsfargate: "#FF9900",
  amazons3: "#569A31",
  amazondynamodb: "#4053D6",
  amazonrds: "#4053D6",
  amazonaurora: "#4053D6",
  amazonroute53: "#8C4FFF",
  amazonapigateway: "#8C4FFF",
  amazoncloudwatch: "#E7157B",
  amazoncloudformation: "#E7157B",
  awsiam: "#DD344C",
  awswaf: "#DD344C",
  amazoncognito: "#DD344C",
  amazonecs: "#FF9900",
  amazonredshift: "#8C4FFF",
  amazondocumentdb: "#C925D1",
  amazonsqs: "#FF4F8B",
  amazon: "#FF9900",
  github: "#FFFFFF",
  linux: "#FFFFFF",
  git: "#F05032",
  ansible: "#EE0000",
  jenkins: "#D24939",
  cloudflare: "#F38020",
  redis: "#DC382D",
  terraform: "#844FBA",
  docker: "#2496ED",
  kubernetes: "#326CE5",
};

export function AWSOrbitingCircles({ iconSlugs }: { iconSlugs: string[] }) {
  const [icons, setIcons] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (iconSlugs && iconSlugs.length > 0) {
      fetchSimpleIcons({ slugs: iconSlugs }).then((res) => {
        const fetchedIcons = Object.values(res.simpleIcons)
          .filter((icon) => icon.path && (icon.path.startsWith("M") || icon.path.startsWith("m")))
          .map((icon) => {
            let color =
              customColors[icon.slug] ||
              (icon.hex === "232F3E" ? "#FF9900" : `#${icon.hex}`);

            // Fix icons that default to black so they don't disappear on dark background
            if (
              color.toLowerCase() === "#000" ||
              color.toLowerCase() === "#000000" ||
              color.toLowerCase() === "#1d1d1d"
            ) {
              color = "#FFFFFF";
            }

            return (
              <div key={icon.slug} className="flex flex-col items-center justify-center relative w-full h-full group">
                <svg
                  viewBox="0 0 24 24"
                  width="100%"
                  height="100%"
                  fill={color}
                >
                  <path d={icon.path} />
                </svg>
              </div>
            );
          });

        setIcons(fetchedIcons);
      });
    }
  }, [iconSlugs]);

  if (icons.length === 0) return null;

  // Distribute 25 icons: 5 inner, 8 middle, 12 outer
  const ring1Count = 5;
  const ring2Count = 8;
  const ring3Count = 12;

  const ring1 = icons.slice(0, ring1Count);
  const ring2 = icons.slice(ring1Count, ring1Count + ring2Count);
  const ring3 = icons.slice(ring1Count + ring2Count, ring1Count + ring2Count + ring3Count);

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-visible">
      {ring1.length > 0 && (
        <OrbitingCircles iconSize={36} radius={95} speed={1.5}>
          {ring1}
        </OrbitingCircles>
      )}
      {ring2.length > 0 && (
        <OrbitingCircles iconSize={32} radius={160} speed={2} reverse>
          {ring2}
        </OrbitingCircles>
      )}
      {ring3.length > 0 && (
        <OrbitingCircles iconSize={28} radius={230} speed={2.5}>
          {ring3}
        </OrbitingCircles>
      )}
    </div>
  );
}
