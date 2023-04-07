package com.example.repository;

import com.example.model.Product;
import com.example.model.dto.ProductDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
//    long id, String name, int width, int length, int height, Category categoryId, BigDecimal price
    @Query(value = "SELECT NEW com.example.model.dto.ProductDTO(" +
            "p.id," +
            "p.name,"+
            "p.width,"+
            "p.length,"+
            "p.height,"+
            "p.createAt,"+
            "p.updateAt,"+
            "p.categoryId,"+
            "p.price,"+
            "p.quantity,"+
            "p.description"+") FROM Product AS p")
    List<ProductDTO> findAllProductDTO();
}
