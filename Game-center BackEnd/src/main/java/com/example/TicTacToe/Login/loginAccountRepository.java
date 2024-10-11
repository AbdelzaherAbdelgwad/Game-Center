package com.example.TicTacToe.Login;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface loginAccountRepository extends JpaRepository<loginAccount,Long> {
    loginAccount findByUsername(String name);
    loginAccount findByEmail(String name);

}
