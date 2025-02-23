import { render, screen, fireEvent } from "@testing-library/react";
import CarCard from "./CarCard";
import { Car } from "../../types";

describe("CarCard", () => {
  let car: Car;
  let onSelect: jest.Mock;

  beforeEach(() => {
    car = { type: "Sedan", available: 3, imageUrl: "/images/sedan.png" };
    onSelect = jest.fn();
  });

  test("renders car details", () => {
    render(<CarCard car={car} isSelected={false} onSelect={onSelect} />);

    expect(screen.getByText(/Type: Sedan/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", car.imageUrl);
  });

  test("applies selected style when selected", () => {
    render(<CarCard car={car} isSelected={true} onSelect={onSelect} />);
    expect(screen.getByTestId("car-card")).toHaveClass("selected");
  });

  test("calls onSelect when clicked", () => {
    render(<CarCard car={car} isSelected={false} onSelect={onSelect} />);
    fireEvent.click(screen.getByTestId("car-card"));
    expect(onSelect).toHaveBeenCalledWith(car.type);
  });
});
