import Image from "next/image";

/**
 * Inline badge for findings sourced from JFrog Security Research.
 * Non-interactive; icon carries brand color, text stays neutral.
 */
export function JFrogResearchBadge() {
  return (
    <span
      className="inline-flex items-center rounded"
      style={{
        background: "#f3f4f6",
        padding: "4px 8px",
        borderRadius: 4,
      }}
    >
      <Image
        src="/icons/jfrog-research.png"
        alt=""
        width={15}
        height={15}
        className="shrink-0"
        aria-hidden
      />
      <span
        className="ml-1 text-[12px] font-semibold"
        style={{ color: "#374151" }}
      >
        JFrog Research
      </span>
    </span>
  );
}
