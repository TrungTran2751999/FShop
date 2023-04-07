package com.example.repository;

import com.example.model.Cart;
import com.example.model.dto.CartDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<CartDTO> findCartsByStatus(int status);
}