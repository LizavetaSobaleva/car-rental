import React, { useState } from "react";
import { useCarContext } from "../../context/CarContext";
import CarCard from "../CarCard/CarCard";
import styles from "./ReservationForm.module.css";

const ReservationForm: React.FC = () => {
  const { cars, reserveCar } = useCarContext();
  const [selectedCar, setSelectedCar] = useState<string>(cars[0].type);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [days, setDays] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!startDate || !startTime) {
      setErrorMessage("Please enter a start date and time!");
      return;
    }

    const success = reserveCar(selectedCar, startDate, startTime, days);
    if (!success) {
      setErrorMessage(
        `No available cars of type ${selectedCar} for the selected dates!`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Select a car:</h3>
      <div className={styles.carSelection}>
        {cars.map((car) => (
          <CarCard
            key={car.type}
            car={car}
            isSelected={selectedCar === car.type}
            onSelect={setSelectedCar}
          />
        ))}
      </div>

      <label className={styles.label}>
        Start date:
        <input
          type="date"
          value={startDate}
          min={today}
          className={styles.input}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Start time:
        <input
          type="time"
          value={startTime}
          className={styles.input}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
      </label>

      <label className={styles.label}>
        Number of days:
        <input
          type="number"
          value={days}
          className={styles.input}
          min="1"
          onChange={(e) => setDays(Number(e.target.value))}
        />
      </label>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <button type="submit" className={styles.submitButton}>
        Book now
      </button>
    </form>
  );
};

export default ReservationForm;
