package esprit.example.fegaac1.controller;

import esprit.example.fegaac1.entities.Appartement;
import esprit.example.fegaac1.entities.Bloc;
import esprit.example.fegaac1.services.IAppartementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appartements")
@RequiredArgsConstructor
public class AppartementController {

    private final  IAppartementService appartementService;
/*
    // Add new appartement
    @PostMapping        
    public ResponseEntity<Appartement> addAppartement(@RequestBody Appartement appartement) {
        Appartement created = appartementService.addAppartement(appartement);
        return ResponseEntity.ok(created);
    }*/

    // Get all appartements
    @GetMapping
    public ResponseEntity<List<Appartement>> getAllAppartements() {
        List<Appartement> appartements = appartementService.getAllAppartements();
        if (appartements.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(appartements);
    }


    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appartement> getAppartementById(@PathVariable Long id) {
        return appartementService.getAppartementById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update appartement
    @PutMapping
    public ResponseEntity<Appartement> updateAppartement(@RequestBody Appartement appartement) {
        try {
            Appartement updated = appartementService.updateAppartement(appartement);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // Delete appartement
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppartement(@PathVariable Long id) {
        try {
            appartementService.deleteAppartement(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get appartements by bloc
    @PostMapping("/by-bloc")
    public ResponseEntity<List<Appartement>> getByBloc(@RequestBody Bloc bloc) {
        return ResponseEntity.ok(appartementService.getAppartementsByBloc(bloc));
    }
}
