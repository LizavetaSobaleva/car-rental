import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./context/CarContext", () => ({
  CarProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useCarContext: jest.fn(() => ({
    cars: [],
    reservations: [],
    reserveCar: jest.fn(),
  })),
}));

jest.mock("./components/ReservationForm/ReservationForm", () => () => (
  <div data-testid="reservation-form">ReservationForm</div>
));

jest.mock("./components/ReservationList/ReservationList", () => () => (
  <div data-testid="reservation-list">ReservationList</div>
));

describe("App", () => {
  test("renders ReservationForm and ReservationList", () => {
    render(<App />);

    expect(screen.getByTestId("reservation-form")).toBeInTheDocument();
    expect(screen.getByTestId("reservation-list")).toBeInTheDocument();
  });
});
