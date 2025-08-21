package esprit.example.fegaac1.controller;


import esprit.example.fegaac1.entities.*;
import esprit.example.fegaac1.services.IReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/reservation")
@RequiredArgsConstructor
public class ReservationController {

    private final IReservationService reservationService;

    @GetMapping("/pays")
    public List<Pays> getAllPays() {
        return reservationService.getAllPays();
    }

    @GetMapping("/residences/{paysId}")
    public Set<Residence> getResidences(@PathVariable Long paysId) {
        return reservationService.getResidencesByPays(paysId);
    }

    @GetMapping("/blocs/{residenceId}")
    public Set<Bloc> getBlocs(@PathVariable Long residenceId) {
        return reservationService.getBlocsByResidence(residenceId);
    }

    @GetMapping("/appartements/{blocId}")
    public Set<Appartement> getAppartements(@PathVariable Long blocId) {
        return reservationService.getAppartementsByBloc(blocId);
    }



    @PostMapping("/{appartementId}")
    public Reservation createReservation(
            @PathVariable Long appartementId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end
    ) {
        return reservationService.createReservation(appartementId, start, end);
    }



}
