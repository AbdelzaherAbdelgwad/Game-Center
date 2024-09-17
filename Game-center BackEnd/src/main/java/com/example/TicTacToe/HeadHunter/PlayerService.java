package com.example.TicTacToe.HeadHunter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlayerService {
    @Autowired
    private PlayerRepository playerRepo ;
    public Player addPlayer(Player player){
        return playerRepo.save(player);
    }
    public List<Player> getAllPlayers(){
        return playerRepo.findAll();
    }
    public Player getByPlayerName(String Name){
        return playerRepo.findByName(Name);
    }
    public String deletePlayers(){
        playerRepo.deleteAll();
        return "allDeleted";
    }
    public String deletePlayer(Long id){
        playerRepo.deleteById(id);
        return "Scores deleted ... with id: "+id;
    }
    public Player updatePlayer(Player player){
        Player oldPlayer = playerRepo.findByName(player.name);
        oldPlayer.score = player.score;
        oldPlayer.accuracy = player.accuracy;
        return playerRepo.save(oldPlayer);
    }
}
