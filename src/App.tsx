import React from "react";
import { CarProvider } from "./context/CarContext";
import ReservationForm from "./components/ReservationForm/ReservationForm";
import ReservationList from "./components/ReservationList/ReservationList";

const App: React.FC = () => {
  return (
    <CarProvider>
      <ReservationForm />
      <ReservationList />
    </CarProvider>
  );
};

export default App;
