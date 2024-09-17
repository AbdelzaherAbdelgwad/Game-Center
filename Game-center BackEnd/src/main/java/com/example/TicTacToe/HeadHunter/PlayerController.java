package com.example.TicTacToe.HeadHunter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/playerInfo")
@CrossOrigin("http://localhost:3000")
public class PlayerController {
    @Autowired
    private PlayerService playerServ;

    @PostMapping("/addPlayer")
    public Player addPlayer(@RequestBody Player player){
        return playerServ.addPlayer(player);
    }
    @PostMapping("/updatePlayer")
    public Player UpdateScore(@RequestBody Player scores){
        return playerServ.updatePlayer(scores);
    }
    @GetMapping("/getAllPlayers")
    public List <Player> getPlayers(){
        return playerServ.getAllPlayers();
    }
    @GetMapping("/getPlayerByName + {playerName}")
    public Player getPlayerByName(@PathVariable String playerName){
        return playerServ.getByPlayerName(playerName);
    }
    @DeleteMapping("/deleteAllPlayers")
    public String deletePlayers() {
        playerServ.deletePlayers();
        return "allDeleted";
    }
    @DeleteMapping("/deletePlayerById + {id}")
    public String deletePlayer(@PathVariable Long id){
        return playerServ.deletePlayer(id);
    }




}
