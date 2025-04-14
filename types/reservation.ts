export type Reservation = {
  id: string;
  name: string;
  email: string;
  service: string;
  date: Date;
  time: string;
  phone: string;
  status: ReservationStatus;
};

export enum ReservationStatus {
  Pending = 1, // Чакащо
  Approved = 2, // Одобрен
  Rejected = 3, // Отказан
}

export const getReservationStatusLabel = (
  status: ReservationStatus
): string => {
  switch (status) {
    case ReservationStatus.Pending:
      return "Чакаща";
    case ReservationStatus.Approved:
      return "Потвърдена";
    case ReservationStatus.Rejected:
      return "Отказана";
    default:
      return "Неизвестен";
  }
};
