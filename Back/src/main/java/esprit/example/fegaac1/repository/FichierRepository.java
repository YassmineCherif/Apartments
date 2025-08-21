package esprit.example.fegaac1.repository;

import esprit.example.fegaac1.entities.Fichier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FichierRepository extends JpaRepository<Fichier,Long> {
}
