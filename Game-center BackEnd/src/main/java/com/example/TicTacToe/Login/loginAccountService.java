package com.example.TicTacToe.Login;

import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class loginAccountService {
    private  loginAccountRepository loginRepo;
    private  PasswordEncoder passwordEncoder;
    @Autowired
    public loginAccountService(loginAccountRepository loginRepo) {
        this.loginRepo = loginRepo;
        this.passwordEncoder = new BCryptPasswordEncoder(); // Initialize PasswordEncoder here
    }

    public loginAccount addAccount(@NotNull loginAccount acc) {
        // Check if an account with the same username already exists
        loginAccount existAccName = loginRepo.findByUsername(acc.getUsername());
        loginAccount existAccEmail = loginRepo.findByEmail(acc.getEmail());

        if (existAccName != null || existAccEmail != null) {
            System.out.println("Account already exists");
            return null;
        } else {
            // Encode the password and save the new account
            acc.setPassword(passwordEncoder.encode(acc.getPassword()));
            return loginRepo.save(acc);
        }
    }

    public List<loginAccount> getAccounts(){
        return loginRepo.findAll();
    }
    public loginAccount getByAccountName(String Name){
        return loginRepo.findByUsername(Name);
    }
    public boolean checkValidation(String username,String password){
        loginAccount acc = loginRepo.findByUsername(username);
        boolean valid = passwordEncoder.matches(password,acc.getPassword());
        return valid;
    }
    public String deleteById(Long id){
        loginRepo.deleteById(id);
        return "account with " +id+" got deleted";
    }
    public String deleteAll(){
        loginRepo.deleteAll();
        return "All accounts are deleted";
    }

}
