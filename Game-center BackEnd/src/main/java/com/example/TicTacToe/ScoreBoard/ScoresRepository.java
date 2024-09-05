package com.example.TicTacToe.ScoreBoard;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ScoresRepository extends JpaRepository<Scores,Long> {
    Scores findByplayerName(String fullName);
}
