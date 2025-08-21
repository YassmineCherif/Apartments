package esprit.example.fegaac1.services;


 import esprit.example.fegaac1.entities.*;
import esprit.example.fegaac1.repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AppartementService implements IAppartementService {


    private final AppartementRepository appartementRepository;
    private final BlocRepository blocRepository;
    private final PaysRepository paysRepository;
    private final ResidenceRepository residenceRepository;

    // ===================== PAYS =====================
    public Pays addPays(Pays pays) {
        return paysRepository.save(pays);
    }

    public Pays updatePays(Pays pays) {
        if (pays.getId_country() == null) throw new IllegalArgumentException("Pays ID cannot be null");
        Pays p = paysRepository.findById(pays.getId_country())
                .orElseThrow(() -> new IllegalArgumentException("Pays not found"));
        p.setPays(pays.getPays());
        p.setLocalisation(pays.getLocalisation());
        p.setAdress(pays.getAdress());
        p.setVille(pays.getVille());
        return paysRepository.save(p);
    }

    public void deletePays(Long id) {
        if (!paysRepository.existsById(id)) throw new IllegalArgumentException("Pays not found");
        paysRepository.deleteById(id);
    }

    public Optional<Pays> getPaysById(Long id) {
        return paysRepository.findById(id);
    }

    public List<Pays> getAllPays() {
        return paysRepository.findAll();
    }

    // ===================== RESIDENCE =====================
    public Residence addResidence(Residence residence) {
        return residenceRepository.save(residence);
    }

    public Residence updateResidence(Residence residence) {
        if (residence.getId_residence() == null) throw new IllegalArgumentException("Residence ID cannot be null");
        Residence r = residenceRepository.findById(residence.getId_residence())
                .orElseThrow(() -> new IllegalArgumentException("Residence not found"));
        r.setNom(residence.getNom());
        r.setNombrebloc(residence.getNombrebloc());
        r.setId_pays(residence.getId_pays()); // Update Pays
        return residenceRepository.save(r);
    }


    public void deleteResidence(Long id) {
        if (!residenceRepository.existsById(id)) throw new IllegalArgumentException("Residence not found");
        residenceRepository.deleteById(id);
    }

    public Optional<Residence> getResidenceById(Long id) {
        return residenceRepository.findById(id);
    }

    public List<Residence> getAllResidences() {
        return residenceRepository.findAll();
    }

    //  fetch residences from Pays entity
        public List<Residence> getResidencesByPays(Long paysId) {
            return residenceRepository.findByIdPays(paysId);
        }




    // ===================== BLOC =====================
    public Bloc addBloc(Bloc bloc) {
        return blocRepository.save(bloc);
    }

    public Bloc updateBloc(Bloc bloc) {
        if (bloc.getId_bloc() == null) throw new IllegalArgumentException("Bloc ID cannot be null");
        Bloc b = blocRepository.findById(bloc.getId_bloc())
                .orElseThrow(() -> new IllegalArgumentException("Bloc not found"));
        b.setNom(bloc.getNom());
        b.setNombreEtages(bloc.getNombreEtages());
        return blocRepository.save(b);
    }

    public void deleteBloc(Long id) {
        if (!blocRepository.existsById(id)) throw new IllegalArgumentException("Bloc not found");
        blocRepository.deleteById(id);
    }

    public Optional<Bloc> getBlocById(Long id) {
        return blocRepository.findById(id);
    }

    public List<Bloc> getAllBlocs() {
        return blocRepository.findAll();
    }

    // ✅ FIX: fetch blocs from Residence entity
    public List<Bloc> getBlocsByResidence(Long residenceId) {
        Residence residence = residenceRepository.findById(residenceId)
                .orElseThrow(() -> new IllegalArgumentException("Residence not found"));
        return List.copyOf(residence.getBlocs());
    }

    // ===================== APPARTEMENT =====================
    public Appartement addAppartement(Appartement appartement) {
        // Check if title already exists
        if (appartementRepository.findByTitre(appartement.getTitre()).isPresent()) {
            throw new IllegalArgumentException("Appartement with this title already exists.");
        }
        return appartementRepository.save(appartement);
    }

    public Appartement updateAppartement(Appartement appartement) {
        if (appartement.getId_app() == null) throw new IllegalArgumentException("Appartement ID cannot be null");

        // Check if title already exists in another appartement
        Optional<Appartement> existing = appartementRepository.findByTitre(appartement.getTitre());
        if (existing.isPresent() && !existing.get().getId_app().equals(appartement.getId_app())) {
            throw new IllegalArgumentException("Another appartement with this title already exists.");
        }

        Appartement a = appartementRepository.findById(appartement.getId_app())
                .orElseThrow(() -> new IllegalArgumentException("Appartement not found"));

        a.setTitre(appartement.getTitre());
        a.setDescription(appartement.getDescription());
        return appartementRepository.save(a);
    }

    public void deleteAppartement(Long id) {
        if (!appartementRepository.existsById(id)) throw new IllegalArgumentException("Appartement not found");
        appartementRepository.deleteById(id);
    }

    public Optional<Appartement> getAppartementById(Long id) {
        return appartementRepository.findById(id);
    }

    public List<Appartement> getAllAppartements() {
        return appartementRepository.findAll();
    }

    public List<Appartement> getAppartementsByBloc(Long blocId) {
        Bloc bloc = blocRepository.findById(blocId)
                .orElseThrow(() -> new IllegalArgumentException("Bloc not found"));
        return List.copyOf(bloc.getAppartement());
    }

}
