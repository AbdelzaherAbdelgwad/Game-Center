package com.example.TicTacToe.HeadHunter;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "Player")

public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "PlayerSeq")
    @SequenceGenerator(allocationSize = 1,name = "PlayerSeqance",sequenceName = "PlayerSeq")

    Long id;
    String name;
    int score;
    float accuracy;
}
