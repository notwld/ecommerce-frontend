"use client";

import Image from "next/image";
import { useState } from "react";

type ImageWithSkeletonProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  skeletonClassName?: string;
};

export function ImageWithSkeleton({
  src,
  alt,
  sizes,
  priority,
  className,
  skeletonClassName,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <div
          aria-hidden="true"
          className={[
            "absolute inset-0 animate-pulse bg-[#ececee]",
            skeletonClassName ?? "",
          ].join(" ")}
        />
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        onLoadingComplete={() => setIsLoading(false)}
        className={className}
      />
    </>
  );
}
