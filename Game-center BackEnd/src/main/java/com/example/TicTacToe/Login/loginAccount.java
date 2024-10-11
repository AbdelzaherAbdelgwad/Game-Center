package com.example.TicTacToe.Login;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "loginAccount")
@Data
public class loginAccount {

    @Id
    @SequenceGenerator(allocationSize = 1,name = "LoginSeqance",sequenceName = "LoginSeq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LoginSeq")
    Long id;
    String username;
    String email;
    String password;
}
