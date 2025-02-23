export interface Car {
  type: string;
  available: number;
  imageUrl: string;
}

export interface Reservation {
  carType: string;
  startDate: string;
  startTime: string;
  endDate: string;
}
