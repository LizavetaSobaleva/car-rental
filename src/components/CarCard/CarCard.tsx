import { Car } from "../../types";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
  isSelected: boolean;
  onSelect: (carType: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, isSelected, onSelect }) => {
  return (
    <div
      data-testid="car-card"
      className={`${styles.card} ${isSelected ? styles.selected : ""}`}
      onClick={() => onSelect(car.type)}
      role="button"
      tabIndex={0}
    >
      <img src={car.imageUrl} alt={car.type} className={styles.image} />
      <p className={styles.model}>Type: {car.type}</p>
    </div>
  );
};

export default CarCard;
