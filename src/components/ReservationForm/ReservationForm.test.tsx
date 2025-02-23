import { render, screen, fireEvent } from "@testing-library/react";
import ReservationForm from "./ReservationForm";
import { useCarContext } from "../../context/CarContext";

jest.mock("../../context/CarContext", () => ({
  useCarContext: jest.fn(),
}));

describe("ReservationForm", () => {
  let reserveCar: jest.Mock;

  beforeEach(() => {
    reserveCar = jest.fn();
    (useCarContext as jest.Mock).mockReturnValue({
      cars: [
        { type: "Sedan", available: 3, imageUrl: "/images/sedan.png" },
        { type: "SUV", available: 2, imageUrl: "/images/suv.png" },
      ],
      reserveCar,
    });
  });

  test("renders form fields and car selection", () => {
    render(<ReservationForm />);

    expect(screen.getByText(/Select a car:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Start time:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of days:/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Book now/i })
    ).toBeInTheDocument();
  });

  test("displays an error message if date or time is missing", () => {
    render(<ReservationForm />);

    fireEvent.click(screen.getByRole("button", { name: /Book now/i }));

    expect(
      screen.getByText("Please enter a start date and time!")
    ).toBeInTheDocument();
  });

  test("calls reserveCar on valid form submission", () => {
    render(<ReservationForm />);

    fireEvent.change(screen.getByLabelText(/Start date:/i), {
      target: { value: "2025-03-10" },
    });
    fireEvent.change(screen.getByLabelText(/Start time:/i), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Number of days:/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Book now/i }));

    expect(reserveCar).toHaveBeenCalledWith("Sedan", "2025-03-10", "10:00", 2);
  });

  test("shows error if reserveCar returns false", () => {
    reserveCar.mockReturnValue(false);
    render(<ReservationForm />);

    fireEvent.change(screen.getByLabelText(/Start date:/i), {
      target: { value: "2025-03-10" },
    });
    fireEvent.change(screen.getByLabelText(/Start time:/i), {
      target: { value: "10:00" },
    });
    fireEvent.change(screen.getByLabelText(/Number of days:/i), {
      target: { value: "2" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Book now/i }));

    expect(
      screen.getByText(
        /No available cars of type Sedan for the selected dates!/i
      )
    ).toBeInTheDocument();
  });
});
