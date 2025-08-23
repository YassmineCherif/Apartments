package esprit.example.fegaac1.services;

import esprit.example.fegaac1.entities.*;
import esprit.example.fegaac1.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ReservationService  implements IReservationService {



    private final PaysRepository paysRepository;
    private final ResidenceRepository residenceRepository;
    private final BlocRepository blocRepository;
    private final AppartementRepository appartementRepository;
    private final ReservationRepository reservationRepository;
    private final UserRepository userRepository;


    // Get all countries
    public List<Pays> getAllPays() {
        return paysRepository.findAll();
    }

    // Get residences of a specific country
    public Set<Residence> getResidencesByPays(Long paysId) {
        return paysRepository.findById(paysId)
                .map(Pays::getResidences)
                .orElse(Collections.emptySet());
    }

    // Get blocs of a specific residence
    public Set<Bloc> getBlocsByResidence(Long residenceId) {
        return residenceRepository.findById(residenceId)
                .map(Residence::getBlocs)
                .orElse(Collections.emptySet());
    }

    // Get appartements of a specific bloc
    public Set<Appartement> getAppartementsByBloc(Long blocId) {
        return blocRepository.findById(blocId)
                .map(Bloc::getAppartement)
                .orElse(Collections.emptySet());
    }




    public Reservation createReservation(Long appartementId, LocalDate start, LocalDate end) {
        Appartement appartement = appartementRepository.findById(appartementId)
                .orElseThrow(() -> new RuntimeException("Appartement not found"));
        Reservation reservation = new Reservation();
        reservation.setAppartements(appartement);
        reservation.setDateDebut(start);
        reservation.setDateFin(end);
        reservation.setApproved(2); // default
        return reservationRepository.save(reservation);
    }


    public Reservation reserverAppartement(Long appartementId, Long userId, LocalDate dateDebut, LocalDate dateFin) {
        Appartement appartement = appartementRepository.findById(appartementId)
                .orElseThrow(() -> new IllegalArgumentException("Appartement not found with id: " + appartementId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));

        // Validate dates
        if (dateDebut == null || dateFin == null || dateDebut.isAfter(dateFin)) {
            throw new IllegalArgumentException("Invalid reservation dates");
        }

        // Check for overlapping reservations
        boolean hasOverlap = hasOverlap(userId, dateDebut, dateFin);
        if (hasOverlap) {
            throw new IllegalArgumentException("You already have a reservation that overlaps with these dates");
        }

        Reservation reservation = new Reservation();
        reservation.setAppartements(appartement);
        reservation.setUser(user);
        reservation.setDateDebut(dateDebut);
        reservation.setDateFin(dateFin);
        reservation.setApproved(2);

        return reservationRepository.save(reservation);
    }




    public boolean existsByUserAndAppartement(Long userId, Long appartementId) {
        return reservationRepository.existsReservation(userId, appartementId);
    }



    public List<Reservation> getReservationsByUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return reservationRepository.findByUser(user);
    }




    public boolean hasApprovedReservation(Long userId) {
        return reservationRepository.existsByUserIdAndApproved(userId, 1);
    }


    public boolean hasOverlap(Long userId, LocalDate newStart, LocalDate newEnd) {
        System.out.println("Backend: checking overlap for user " + userId +
                " from " + newStart + " to " + newEnd);

        List<Reservation> approvedReservations = reservationRepository.findApprovedReservationsByUser(userId);

        for (Reservation r : approvedReservations) {
            System.out.println("Backend: existing approved reservation = " +
                    r.getDateDebut() + " -> " + r.getDateFin());
            if (!(newEnd.isBefore(r.getDateDebut()) || newStart.isAfter(r.getDateFin()))) {
                System.out.println("Backend: overlap detected!");
                return true;
            }
        }
        System.out.println("Backend: no overlap");
        return false;
    }




        public Reservation updateApproval(Long reservationId, int status) {
        Reservation r = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));
        r.setApproved(status);
        return reservationRepository.save(r);
    }








}
