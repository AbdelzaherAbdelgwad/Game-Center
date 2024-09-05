package com.example.TicTacToe.ScoreBoard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Scores")
@CrossOrigin("http://localhost:3000")
public class ScoresController {
    @Autowired
    private ScoresService scoresServ;

    @PostMapping("/savePlayer")
    public Scores save(@RequestBody Scores scores){
        return scoresServ.savePlayer(scores);
    }
    @PostMapping("/updateScore")
    public Scores UpdateScore(@RequestBody Scores scores){
        return scoresServ.updateScore(scores);
    }
    @GetMapping("/getAllPlayers")
    public List<Scores> getPlayers(){
        return scoresServ.getPlayers();
    }
    @GetMapping("/getPlayer + {playerName}")
    public Scores getPlayerByName(@PathVariable String playerName){
        return scoresServ.getPlayerByName(playerName);
    }
    @DeleteMapping("/deleteAll")
    public String deletePlayers(){
        scoresServ.deletePlayers();
        return "allDeleted";
    }
    @DeleteMapping("/deleteById + {id}")
    public String deletePlayer(@PathVariable Long id){
      return scoresServ.deletePlayer(id);
    }
}
