package esprit.example.fegaac1.services;


import esprit.example.fegaac1.entities.Appartement;
import esprit.example.fegaac1.entities.Bloc;
import esprit.example.fegaac1.entities.User;
import esprit.example.fegaac1.repository.AppartementRepository;
import esprit.example.fegaac1.repository.BlocRepository;
import esprit.example.fegaac1.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppartementService implements IAppartementService {

    private final AppartementRepository appartementRepository;
    private final BlocRepository blocRepository;
    private final UserRepository userRepository;

   /*
    public Appartement addAppartement(Appartement appartement) {
        // Step 1: Check for null or empty title
        if (appartement.getTitre() == null || appartement.getTitre().trim().isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }

        // ✅ Step 2: Fetch the managed Bloc
        Bloc bloc = blocRepository.findById(appartement.getBloc().getId_bloc())
                .orElseThrow(() -> new IllegalArgumentException("Bloc not found"));

        // ✅ Step 3: Fetch the managed User
        User user = userRepository.findById(appartement.getUser().getId_user())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Step 4: Check if an appartement with the same title exists in the same bloc
        List<Appartement> existingAppartements = appartementRepository.findByTitreAndBloc(appartement.getTitre(), bloc);
        if (!existingAppartements.isEmpty()) {
            throw new IllegalArgumentException("Appartement with the same title already exists in this bloc");
        }

        // ✅ Step 5: Assign the managed references
        appartement.setBloc(bloc);
        appartement.setUser(user);

        // ✅ Step 6: Save
        return appartementRepository.save(appartement);
    }

    */
    @Override
    public Appartement updateAppartement(Appartement appartement) {
        if (appartement.getId_app() == null) {
            throw new IllegalArgumentException("Appartement ID cannot be null for update");
        }

        Optional<Appartement> existingAppartementOpt = appartementRepository.findById(appartement.getId_app());

        if (existingAppartementOpt.isEmpty()) {
            throw new IllegalArgumentException("Appartement not found with ID: " + appartement.getId_app());
        }

        Appartement existingAppartement = existingAppartementOpt.get();

        // Update fields (optional logic to preserve unchanged ones)
        existingAppartement.setTitre(appartement.getTitre());
       // existingAppartement.setBloc(appartement.getBloc());
        existingAppartement.setDescription(appartement.getDescription());
        return appartementRepository.save(existingAppartement);
    }

    @Override
    public void deleteAppartement(Long id) {
        if (!appartementRepository.existsById(id)) {
        throw new IllegalArgumentException("Appartement not found with ID: " + id);
    }
        appartementRepository.deleteById(id);

    }

    @Override
    public Optional<Appartement> getAppartementById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Appartement> getAllAppartements() {
        return appartementRepository.findAll();
    }

    @Override
    public List<Appartement> getAppartementsByBloc(Bloc bloc) {
        return List.of();
    }
}
