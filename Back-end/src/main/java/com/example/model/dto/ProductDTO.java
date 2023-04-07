package com.example.model.dto;

import com.example.model.Category;
import com.example.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductDTO {
    private long id;
    @NotNull
    private String name;
    @NotNull
    private int width;
    @NotNull
    private int length;
    @NotNull
    private int height;
    @NotNull
    private String createAt;
    @NotNull
    private String updateAt;
    @NotNull
    private Category categoryId;
    @NotNull
    private BigDecimal price;
    @NotNull
    private long quantity;
    @NotNull
    private String description;

    public ProductDTO(long id, String name, int width, int length, int height, Category categoryId, BigDecimal price, long quantity, String description) {
        this.id = id;
        this.name = name;
        this.width = width;
        this.length = length;
        this.height = height;
        this.categoryId = categoryId;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
    public Product toProduct(){
        return new Product(id, name, width, length, height, createAt, updateAt, categoryId, price, quantity, description);
    }
}
