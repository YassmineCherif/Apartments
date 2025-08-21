package esprit.example.fegaac1.repository;

import esprit.example.fegaac1.entities.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
