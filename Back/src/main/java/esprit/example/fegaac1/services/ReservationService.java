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
                .orElseThrow(() -> new RuntimeException("Appartement not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

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




}
