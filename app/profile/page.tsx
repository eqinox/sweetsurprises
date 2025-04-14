import { getAllReservations } from "@/actions/reservation-actions";
import Reservations from "@/components/reservations";

const UserProfilePage = async () => {
  const reservations = await getAllReservations();

  return (
    <div className="relative w-full">
      {/* Background Section with Fixed Background */}
      <div className="w-full h-screen bg-[url('/studio4.jpeg')] bg-cover bg-center bg-fixed">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative hidden z-10 md:flex flex-col items-center justify-center min-h-screen w-1/2 m-auto">
          <span className="text-white text-xl">
            Резервации които хората са направили
          </span>
          <Reservations reservations={reservations} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
