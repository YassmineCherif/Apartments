package esprit.example.fegaac1.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "app_user")  // ✅ FIX: avoids conflict with SQL Server reserved word
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    private String nom;
    private String prenom;
    private String email;
    private String cin;
    private boolean approved; //0 or 1
    private String numerotelephone;

    @Enumerated(EnumType.STRING)
    private USER_ROLE user_role;

    private String adresse;
    private String login;
    private String mdp;
    private boolean actif;
    private String derniercnx;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Pays> pays;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Reservation> reservations;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Chat> chats;

    @OneToMany(cascade = CascadeType.ALL)
    private Set<Reclamation> reclamations;


}
