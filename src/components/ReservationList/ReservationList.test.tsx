import { render, screen } from "@testing-library/react";
import ReservationList from "./ReservationList";
import { useCarContext } from "../../context/CarContext";

jest.mock("../../context/CarContext", () => ({
  useCarContext: jest.fn(),
}));

describe("ReservationForm", () => {
  test("renders empty state when no reservations exist", () => {
    (useCarContext as jest.Mock).mockReturnValue({ reservations: [] });
    render(<ReservationList />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    expect(
      screen.getByText("You don't have any reservations yet.")
    ).toBeInTheDocument();
  });

  test("renders reservation cards when reservations exist", () => {
    (useCarContext as jest.Mock).mockReturnValue({
      reservations: [
        {
          carType: "Sedan",
          startDate: "2025-03-01",
          startTime: "10:00",
          endDate: "2025-03-05T00:00:00.000Z",
        },
        {
          carType: "SUV",
          startDate: "2025-03-02",
          startTime: "12:00",
          endDate: "2025-03-06T00:00:00.000Z",
        },
      ],
    });

    render(<ReservationList />);

    expect(screen.getByText("Sedan")).toBeInTheDocument();
    expect(screen.getByText("SUV")).toBeInTheDocument();
    expect(screen.queryByTestId("empty-state")).not.toBeInTheDocument();
  });
});
