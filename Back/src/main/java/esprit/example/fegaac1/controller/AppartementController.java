package esprit.example.fegaac1.controller;

import esprit.example.fegaac1.entities.*;
import esprit.example.fegaac1.services.AppartementService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/appartement")
@RequiredArgsConstructor
public class AppartementController {

    private final AppartementService appartementService;

    // ===================== PAYS =====================
    @GetMapping("/pays")
    public List<Pays> getAllPays() {
        return appartementService.getAllPays();
    }

    @GetMapping("/pays/{id}")
    public Optional<Pays> getPaysById(@PathVariable Long id) {
        return appartementService.getPaysById(id);
    }

    @PostMapping("/pays")
    public Pays addPays(@RequestBody Pays pays) {
        return appartementService.addPays(pays);
    }

    @PutMapping("/pays")
    public Pays updatePays(@RequestBody Pays pays) {
        return appartementService.updatePays(pays);
    }

    @DeleteMapping("/pays/{id}")
    public void deletePays(@PathVariable Long id) {
        appartementService.deletePays(id);
    }

    // ===================== RESIDENCE =====================
    @GetMapping("/residences")
    public List<Residence> getAllResidences() {
        return appartementService.getAllResidences();
    }

    @GetMapping("/residences/{id}")
    public Optional<Residence> getResidenceById(@PathVariable Long id) {
        return appartementService.getResidenceById(id);
    }

    @GetMapping("/residences/byPays/{paysId}")
    public List<Residence> getResidencesByPays(@PathVariable Long paysId) {
        return appartementService.getResidencesByPays(paysId);
    }

    @PostMapping("/residences")
    public Residence addResidence(@RequestBody Residence residence) {
        return appartementService.addResidence(residence);
    }

    @PutMapping("/residences")
    public Residence updateResidence(@RequestBody Residence residence) {
        return appartementService.updateResidence(residence);
    }

    @DeleteMapping("/residences/{id}")
    public void deleteResidence(@PathVariable Long id) {
        appartementService.deleteResidence(id);
    }

    // ===================== BLOC =====================
    @GetMapping("/blocs")
    public List<Bloc> getAllBlocs() {
        return appartementService.getAllBlocs();
    }

    @GetMapping("/blocs/{id}")
    public Optional<Bloc> getBlocById(@PathVariable Long id) {
        return appartementService.getBlocById(id);
    }

    @GetMapping("/blocs/byResidence/{residenceId}")
    public List<Bloc> getBlocsByResidence(@PathVariable Long residenceId) {
        return appartementService.getBlocsByResidence(residenceId);
    }


    @PostMapping("/blocs")
    public Bloc addBloc(@RequestBody Bloc bloc) {
        return appartementService.addBloc(bloc);
    }

    @PutMapping("/blocs")
    public Bloc updateBloc(@RequestBody Bloc bloc) {
        return appartementService.updateBloc(bloc);
    }

    @DeleteMapping("/blocs/{id}")
    public void deleteBloc(@PathVariable Long id) {
        appartementService.deleteBloc(id);
    }

    // ===================== APPARTEMENT =====================
    @GetMapping("/appartements")
    public List<Appartement> getAllAppartements() {
        return appartementService.getAllAppartements();
    }

    @GetMapping("/appartements/{id}")
    public Optional<Appartement> getAppartementById(@PathVariable Long id) {
        return appartementService.getAppartementById(id);
    }

    @GetMapping("/appartements/byBloc/{blocId}")
    public List<Appartement> getAppartementsByBloc(@PathVariable Long blocId) {
        return appartementService.getAppartementsByBloc(blocId);
    }

    @PostMapping("/appartements")
    public Appartement addAppartement(@RequestBody Appartement appartement) {
        return appartementService.addAppartement(appartement);
    }

    @PutMapping("/appartements")
    public Appartement updateAppartement(@RequestBody Appartement appartement) {
        return appartementService.updateAppartement(appartement);
    }

    @DeleteMapping("/appartements/{id}")
    public void deleteAppartement(@PathVariable Long id) {
        appartementService.deleteAppartement(id);
    }
}
