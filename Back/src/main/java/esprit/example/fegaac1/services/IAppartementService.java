package esprit.example.fegaac1.services;

import esprit.example.fegaac1.entities.Appartement;
import esprit.example.fegaac1.entities.Bloc;

import java.util.List;
import java.util.Optional;

public interface IAppartementService {

    // Add a new appartement with validation and business logic
  //  Appartement addAppartement(Appartement appartement);

    // Update an existing appartement
    Appartement updateAppartement(Appartement appartement);

    // Delete appartement by ID
    void deleteAppartement(Long id);

    // Find appartement by ID (returns Optional in case not found)
    Optional<Appartement> getAppartementById(Long id);

    // Get all appartements
    List<Appartement> getAllAppartements();

    // Find appartements by bloc
    List<Appartement> getAppartementsByBloc(Bloc bloc);

}