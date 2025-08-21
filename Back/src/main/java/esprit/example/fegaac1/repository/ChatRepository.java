package esprit.example.fegaac1.repository;

import esprit.example.fegaac1.entities.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
