import { Composition, AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const rotate = interpolate(frame, [45, 105], [0, 360], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#111827", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "white", fontSize: 120, fontFamily: "sans-serif", transform: `scale(${scale}) rotate(${rotate}deg)` }}>
        Remotion OK
      </h1>
    </AbsoluteFill>
  );
};

export const Root: React.FC = () => (
  <Composition id="Main" component={Main} durationInFrames={120} fps={30} width={1920} height={1080} />
);
