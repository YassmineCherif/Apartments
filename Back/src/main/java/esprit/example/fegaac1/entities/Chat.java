package esprit.example.fegaac1.entities;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_chat;

    private String content;
    private String subject;
    private LocalDateTime date;
    private String expediteur;
    private String destinataire;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Fichier> fichiers;

}
