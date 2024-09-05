package com.example.TicTacToe.ScoreBoard;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table (name = "Scores")
public class Scores {
    @Id
    @SequenceGenerator(initialValue = 1,name = "ScoresSeq",sequenceName = "ScoresSeq")
    @GeneratedValue(generator = "ScoresSeq")
    private Long id;
    private String playerName;
    private Long wins;
    private Long losses;

}
