import { renderHook, act } from "@testing-library/react";
import { CarProvider, useCarContext } from "./CarContext";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => (
  <CarProvider>{children}</CarProvider>
);

describe("CarContext", () => {
  test("provides initial car data", () => {
    const { result } = renderHook(() => useCarContext(), { wrapper });

    expect(result.current.cars).toHaveLength(3);
    expect(result.current.cars).toEqual([
      { type: "Sedan", available: 3, imageUrl: "/images/sedan.png" },
      { type: "SUV", available: 2, imageUrl: "/images/suv.png" },
      { type: "VAN", available: 1, imageUrl: "/images/van.png" },
    ]);
  });

  test("allows reserving a car when available", () => {
    const { result } = renderHook(() => useCarContext(), { wrapper });

    act(() => {
      const success = result.current.reserveCar(
        "Sedan",
        "2025-03-10",
        "10:00",
        2
      );
      expect(success).toBe(true);
    });

    expect(result.current.reservations).toHaveLength(1);
    expect(result.current.reservations[0]).toMatchObject({
      carType: "Sedan",
      startDate: "2025-03-10",
      startTime: "10:00",
      endDate: expect.any(String),
    });
  });
});
