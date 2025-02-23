import React from "react";
import { Reservation } from "../../types";
import styles from "./ReservationCard.module.css";

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{reservation.carType}</h3>

      <div className={styles.details}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Rental start:</span>
          <span className={styles.value}>
            {reservation.startDate} {reservation.startTime}
          </span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.label}>Rental end:</span>
          <span className={styles.value}>
            {new Date(reservation.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
