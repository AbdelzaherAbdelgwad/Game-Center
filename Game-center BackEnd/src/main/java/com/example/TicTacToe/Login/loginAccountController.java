package com.example.TicTacToe.Login;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/loginAccounts")
@CrossOrigin("http://localhost:3000")
public class loginAccountController {
    @Autowired
    private loginAccountService loginServ;
    @PostMapping("/addAccount")
    public loginAccount addAccount(@RequestBody loginAccount acc){
        return loginServ.addAccount(acc);
    }
//    @PostMapping("/updateloginAccount")
//    public loginAccount UpdateScore(@RequestBody loginAccount scores){
//        return loginServ.updateloginAccount(scores);
//    }
    @GetMapping("/getAllAccounts")
    public List<loginAccount> getAccounts(){
        return loginServ.getAccounts();
    }
    @GetMapping("/getAccountByName + {account}")
    public loginAccount getloginAccountByName(@PathVariable String account){
        return loginServ.getByAccountName(account);
    }
    @DeleteMapping("/delleteAllAccouts")
    public String deleteloginAccounts() {

        return loginServ.deleteAll();
    }
    @DeleteMapping("/deleteById + {id}")
    public String deleteAccountById(@PathVariable Long id){
        return loginServ.deleteById(id);
    }

//    getMapping for validation
    @PostMapping("/checkValidation")
    public boolean checkValidation(@RequestBody loginAccount account) {
        return loginServ.checkValidation(account.getUsername(), account.getPassword());
    }

}
