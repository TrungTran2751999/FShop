package com.example.repository;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Product;
import com.example.model.dto.CartDetailDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {
    List<CartDetail> findCartDetailsByCart(Cart cart);

    @Query(value = "SELECT NEW com.example.model.dto.CartDetailDTO(" +
            "c.id," +
            "c.product,"+
            "c.quantity,"+
            "c.createAt,"+
            "c.updateAt"+
            ") FROM CartDetail AS c WHERE c.cart = :cart")
    List<CartDetailDTO> findCartDetailsByCartDTO(@Param("cart") Cart cart);
}