export type ApplicabilityState =
  | "Applicable"
  | "Not Applicable"
  | "Not Covered"
  | "Rescanning";

const STATE_STYLES: Record<
  ApplicabilityState,
  { background: string; color: string }
> = {
  Applicable: { background: "#FEDCDE", color: "#9F1420" },
  "Not Applicable": { background: "#d9fad2", color: "#0e7c3f" },
  "Not Covered": { background: "#eaeef5", color: "#5e6d81" },
  Rescanning: { background: "#fff3d6", color: "#92400e" },
};

export function ApplicabilityPill({ state }: { state: ApplicabilityState }) {
  const styles = STATE_STYLES[state];
  return (
    <span
      className="inline-flex items-center text-[14px] font-semibold"
      style={{
        background: styles.background,
        color: styles.color,
        borderRadius: 4,
        padding: "4px 10px",
      }}
    >
      {state}
    </span>
  );
}
