package esprit.example.fegaac1.repository;

import esprit.example.fegaac1.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
