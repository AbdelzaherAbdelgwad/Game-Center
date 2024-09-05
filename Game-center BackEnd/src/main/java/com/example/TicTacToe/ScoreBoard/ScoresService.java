package com.example.TicTacToe.ScoreBoard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoresService {
    @Autowired
    private ScoresRepository ScoresRepo;

    public Scores savePlayer(Scores scores){
        return ScoresRepo.save(scores);
    }
    public List<Scores> getPlayers(){
        return ScoresRepo.findAll();
    }
    public Scores getPlayerByName(String playerName){
        return ScoresRepo.findByplayerName(playerName);
    }
    public String deletePlayers(){
        ScoresRepo.deleteAll();
        return "allDeleted";
    }
    public String deletePlayer(Long id){
        ScoresRepo.deleteById(id);
        return "Scores deleted ... with id: "+id;
    }
    public Scores updateScore(Scores scores){
        Scores score = ScoresRepo.findByplayerName(scores.getPlayerName());
        score.setWins(scores.getWins());
        score.setLosses(scores.getLosses());
        return ScoresRepo.save(score);

    }
}
