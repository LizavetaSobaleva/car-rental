import React, { createContext, useContext, useState } from "react";
import { Car, Reservation } from "../types";

interface CarContextType {
  cars: Car[];
  reservations: Reservation[];
  reserveCar: (
    carType: string,
    startDate: string,
    startTime: string,
    days: number
  ) => boolean;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cars] = useState<Car[]>([
    { type: "Sedan", available: 3, imageUrl: "/images/sedan.png" },
    { type: "SUV", available: 2, imageUrl: "/images/suv.png" },
    { type: "VAN", available: 1, imageUrl: "/images/van.png" },
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([]);

  const reserveCar = (
    carType: string,
    startDate: string,
    startTime: string,
    days: number
  ): boolean => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);

    const reservationsForType = reservations.filter(
      (res) => res.carType === carType
    );
    const activeReservations = reservationsForType.filter(
      (res) =>
        new Date(res.endDate) > new Date(startDate) &&
        new Date(res.startDate) < endDate
    );

    if (
      activeReservations.length >=
      cars.find((car) => car.type === carType)!.available
    ) {
      return false;
    }

    setReservations([
      ...reservations,
      { carType, startDate, startTime, endDate: endDate.toISOString() },
    ]);
    return true;
  };

  return (
    <CarContext.Provider value={{ cars, reservations, reserveCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context)
    throw new Error("useCarContext must be used within a CarProvider");
  return context;
};
