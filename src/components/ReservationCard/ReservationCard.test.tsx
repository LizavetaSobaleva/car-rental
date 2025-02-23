import { render, screen } from "@testing-library/react";
import ReservationCard from "./ReservationCard";
import { Reservation } from "../../types";

describe("CarCard", () => {
  test("renders reservation details", () => {
    const reservation: Reservation = {
      carType: "SUV",
      startDate: "2025-03-01",
      startTime: "10:00",
      endDate: "2025-03-05T00:00:00.000Z",
    };

    render(<ReservationCard reservation={reservation} />);

    expect(screen.getByText("SUV")).toBeInTheDocument();
    expect(screen.getByText(/Rental start:/i)).toBeInTheDocument();
    expect(screen.getByText(/Rental end:/i)).toBeInTheDocument();
    expect(screen.getByText("2025-03-01 10:00")).toBeInTheDocument();
    expect(screen.getByText("3/5/2025")).toBeInTheDocument();
  });
});
