import React from "react";
import { useCarContext } from "../../context/CarContext";
import ReservationCard from "../ReservationCard/ReservationCard";
import styles from "./ReservationList.module.css";

const ReservationList: React.FC = () => {
  const { reservations } = useCarContext();

  return (
    <div className={styles.list}>
      <h2>Active Reservations</h2>
      {reservations.length === 0 ? (
        <div className={styles.emptyState} data-testid="empty-state">
          <p>You don't have any reservations yet.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {reservations.map((res, index) => (
            <ReservationCard key={index} reservation={res} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReservationList;
