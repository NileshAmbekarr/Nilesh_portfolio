"use client";

import { motion, useAnimationControls } from "motion/react";
import React, { useState } from "react";

export const AnimateSvg = ({
  width,
  height,
  viewBox,
  className = "flex justify-center w-full h-full",
  path,
  paths = [],
  strokeColor = "#cecece",
  strokeWidth = 3,
  strokeLinecap = "round",
  animationDuration = 1.5,
  animationDelay = 0,
  animationBounce = 0.3,
  staggerDelay = 0.2,
  reverseAnimation = false,
  enableHoverAnimation = false,
  hoverAnimationType = "redraw",
  hoverStrokeColor = "#4f46e5",
  initialAnimation = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const normalizedPaths = React.useMemo(() => {
    if (paths.length > 0) return paths;
    if (path) {
      let normalizedPath = path;

      if (path.startsWith("M") && path.includes(",")) {
        try {
          const allCoords = [];
          const regex = /[-+]?[0-9]*\.?[0-9]+/g;
          let match;
          while ((match = regex.exec(path)) !== null) {
            allCoords.push(parseFloat(match[0]));
          }

          if (allCoords.length >= 2) {
            let minX = Infinity;
            let minY = Infinity;
            let maxX = -Infinity;
            let maxY = -Infinity;

            for (let i = 0; i < allCoords.length; i += 2) {
              if (i + 1 < allCoords.length) {
                minX = Math.min(minX, allCoords[i]);
                minY = Math.min(minY, allCoords[i + 1]);
                maxX = Math.max(maxX, allCoords[i]);
                maxY = Math.max(maxY, allCoords[i + 1]);
              }
            }

            const pathWidth = maxX - minX;
            const pathHeight = maxY - minY;

            const viewBoxDims = viewBox.split(" ").map(Number);
            const viewBoxWidth = viewBoxDims.length >= 3 ? viewBoxDims[2] : 100;
            const viewBoxHeight = viewBoxDims.length >= 4 ? viewBoxDims[3] : 100;

            const paddingX = viewBoxWidth * 0.1;
            const paddingY = viewBoxHeight * 0.1;

            const scaleX = (viewBoxWidth - 2 * paddingX) / pathWidth;
            const scaleY = (viewBoxHeight - 2 * paddingY) / pathHeight;
            const scale = Math.min(scaleX, scaleY);

            let adjustedPath = path;
            let index = 0;
            adjustedPath = adjustedPath.replace(
              /[-+]?[0-9]*\.?[0-9]+/g,
              (match) => {
                const val = parseFloat(match);
                const isX = index % 2 === 0;
                index++;

                if (isX) {
                  return ((val - minX) * scale + paddingX).toFixed(2);
                }
                return ((val - minY) * scale + paddingY).toFixed(2);
              }
            );
            normalizedPath = adjustedPath;
          }
        } catch (e) {
          console.error("Failed to normalize path:", e);
        }
      }

      return [
        {
          d: normalizedPath,
          stroke: strokeColor,
          strokeWidth,
          strokeLinecap,
        },
      ];
    }
    return [];
  }, [paths, path, strokeColor, strokeWidth, strokeLinecap, viewBox]);

  const getPathVariants = (index) => ({
    hidden: {
      pathLength: 0,
      opacity: 0,
      pathOffset: reverseAnimation ? 1 : 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      pathOffset: reverseAnimation ? 0 : 0,
      transition: {
        pathLength: {
          type: "spring",
          duration: animationDuration,
          bounce: animationBounce,
          delay: animationDelay + index * staggerDelay,
        },
        pathOffset: {
          duration: animationDuration,
          delay: animationDelay + index * staggerDelay,
        },
        opacity: {
          duration: animationDuration / 4,
          delay: animationDelay + index * staggerDelay,
        },
      },
    },
  });

  if (normalizedPaths.length === 0) return null;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={initialAnimation ? "hidden" : "visible"}
      animate="visible"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      whileHover={
        enableHoverAnimation && hoverAnimationType !== "redraw"
          ? { scale: 1.05 }
          : {}
      }
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
    >
      <title>animate svg</title>
      {normalizedPaths.map((pathData, index) => (
        <AnimatedPath
          key={index}
          pathData={pathData}
          index={index}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          initialAnimation={initialAnimation}
          pathVariants={getPathVariants(index)}
          isHovering={isHovering && enableHoverAnimation}
          hoverAnimationType={hoverAnimationType}
          hoverStrokeColor={hoverStrokeColor}
          totalPaths={normalizedPaths.length}
        />
      ))}
    </motion.svg>
  );
};

const AnimatedPath = ({
  pathData,
  index,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  initialAnimation,
  pathVariants,
  isHovering,
  hoverAnimationType,
  hoverStrokeColor,
  totalPaths,
}) => {
  const controls = useAnimationControls();
  const originalColor = pathData.stroke || strokeColor;

  React.useEffect(() => {
    if (!isHovering) {
      controls.stop();
      if (initialAnimation) {
        controls.start("visible");
      }
      return;
    }

    switch (hoverAnimationType) {
      case "redraw":
        controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "float":
        controls.start({
          y: [0, -2, 0],
          transition: {
            y: {
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "pulse":
        controls.start({
          scale: [1, 1.03, 1],
          transition: {
            scale: {
              repeat: Infinity,
              duration: 1.3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "color":
        controls.start({
          stroke: [
            originalColor,
            hoverStrokeColor || strokeColor,
            originalColor,
          ],
          transition: {
            stroke: {
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "sequential":
        controls.start({
          pathLength: [1, 0, 1],
          transition: {
            pathLength: {
              repeat: Infinity,
              duration: 2,
              delay: (index / Math.max(totalPaths, 1)) * 2,
              ease: "easeInOut",
            },
          },
        });
        break;
    }
  }, [
    isHovering,
    hoverAnimationType,
    controls,
    originalColor,
    hoverStrokeColor,
    strokeColor,
    index,
    totalPaths,
    initialAnimation,
  ]);

  return (
    <motion.path
      d={pathData.d}
      stroke={pathData.stroke ?? strokeColor}
      strokeWidth={pathData.strokeWidth ?? strokeWidth}
      strokeLinecap={pathData.strokeLinecap ?? strokeLinecap}
      initial={initialAnimation ? "hidden" : "visible"}
      animate={controls}
      variants={pathVariants}
    />
  );
};
