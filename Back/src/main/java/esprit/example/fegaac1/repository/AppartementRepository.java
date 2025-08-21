package esprit.example.fegaac1.repository;

import esprit.example.fegaac1.entities.Appartement;
import esprit.example.fegaac1.entities.Bloc;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppartementRepository extends JpaRepository<Appartement, Long> {

    //  List<Appartement> findByTitreAndBloc(String titre, Bloc bloc);

}
