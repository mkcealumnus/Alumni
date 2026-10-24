import { describe, it, expect } from "vitest";
import { DEVICE_SIZES } from "@/components/layout/devicePreviewBar";

describe("Physical Device Responsive Layout Specifications", () => {
  it("should contain all 14 physical screen sizes specified in the master table", () => {
    expect(DEVICE_SIZES).toHaveLength(14);
  });

  it("should cover Mobile category from 6.1\" to 8.0\"+ foldables", () => {
    const mobiles = DEVICE_SIZES.filter((d) => d.type === "Mobile");
    expect(mobiles).toHaveLength(3);

    expect(mobiles[0].sizeInches).toBe("6.1\" to 6.3\"");
    expect(mobiles[0].category).toBe("Standard Smartphone");
    expect(mobiles[0].viewportWidth).toBeLessThanOrEqual(420);

    expect(mobiles[1].sizeInches).toBe("6.7\" to 6.8\"");
    expect(mobiles[1].category).toBe("Max / Ultra Phone");

    expect(mobiles[2].sizeInches).toBe("7.6\" to 8.0\"+");
    expect(mobiles[2].category).toBe("Foldable Opened");
  });

  it("should cover Laptop category from 11.6\" compacts to 18.0\" desktop replacements", () => {
    const laptops = DEVICE_SIZES.filter((d) => d.type === "Laptop");
    expect(laptops).toHaveLength(6);

    const sizes = laptops.map((l) => l.sizeInches);
    expect(sizes).toContain("11.6\"");
    expect(sizes).toContain("13.0\" to 13.3\"");
    expect(sizes).toContain("14.0\"");
    expect(sizes).toContain("15.6\"");
    expect(sizes).toContain("16.0\"");
    expect(sizes).toContain("17.3\" to 18.0\"");
  });

  it("should cover Desktop & Ultrawide Monitor category from 21.5\" to 49.0\" super ultrawide", () => {
    const monitors = DEVICE_SIZES.filter((d) => d.type === "Monitor");
    expect(monitors).toHaveLength(5);

    const sizes = monitors.map((m) => m.sizeInches);
    expect(sizes).toContain("21.5\" to 24.0\"");
    expect(sizes).toContain("27.0\"");
    expect(sizes).toContain("32.0\"");
    expect(sizes).toContain("34.0\" to 38.0\"");
    expect(sizes).toContain("49.0\"");
  });

  it("should enforce correct aspect ratio tags for ultrawide (21:9) and super ultrawide (32:9)", () => {
    const ultrawide = DEVICE_SIZES.find((d) => d.sizeInches === "34.0\" to 38.0\"");
    const superwide = DEVICE_SIZES.find((d) => d.sizeInches === "49.0\"");

    expect(ultrawide?.aspectRatio).toBe("21:9");
    expect(superwide?.aspectRatio).toBe("32:9");
    expect(superwide?.viewportWidth).toBeGreaterThanOrEqual(5120);
  });
});
