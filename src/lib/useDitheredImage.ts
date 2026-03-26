import { useRef, useEffect } from "react";
import type { DitheredImageOptions } from "./types";
import { createDitheredCanvas } from "./createDitheredCanvas";

/**
 * React hook that attaches the dithered image effect to a canvas ref.
 *
 * @example
 * ```tsx
 * function Logo() {
 *   const canvasRef = useDitheredImage("/logo.png", { invert: true });
 *   return <canvas ref={canvasRef} style={{ width: 500, height: 500 }} />;
 * }
 * ```
 */
export function useDitheredImage(
  src: string,
  options?: DitheredImageOptions
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optsRef = useRef(options);
  optsRef.current = options;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return createDitheredCanvas(canvas, src, optsRef.current);
  }, [src]);

  return canvasRef;
}
