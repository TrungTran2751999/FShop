package com.example.model.dto;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Customer;
import com.example.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartDetailDTO{
    private long id;
    @Valid
    private ProductDTO product;
    private long quantity;
    private String createAt;
    private String updateAt;
    private CartDTO cart;

    public CartDetailDTO(long id, ProductDTO product, long quantity, CartDTO cart) {
        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.cart = cart;
    }
    public CartDetailDTO(long id, Product product, long quantity, String createAt, String updateAt) {
        this.id = id;
        this.product = product.toProductDTO();
        this.createAt = createAt;
        this.updateAt = updateAt;
        this.quantity = quantity;
    }
    public CartDetailDTO(ProductDTO product, long quantity, CartDTO cart) {
        this.product = product;
        this.quantity = quantity;
        this.cart = cart;
    }
    public CartDetailDTO(ProductDTO product, long quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    public CartDetail toCartDetail(){
        return new CartDetail(id, product.toProduct(), quantity, createAt, updateAt, cart.toCart());
    }
}
