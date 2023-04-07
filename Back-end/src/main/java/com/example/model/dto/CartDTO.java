package com.example.model.dto;

import com.example.model.Cart;
import com.example.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.validation.Valid;
import java.math.BigDecimal;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartDTO {
    private long id;

    private BigDecimal totalPrice;

    private String createAt;
    private int status;
    @Valid
    private CustomerDTO customer;

    public Cart toCart(){
        return new Cart(id, totalPrice, createAt, status, customer.toCustomer());
    }

    public CartDTO(long id, BigDecimal totalPrice, String createAt, int status, Customer customer) {
        this.id = id;
        this.totalPrice = totalPrice;
        this.createAt = createAt;
        this.status = status;
        this.customer = customer.toCustomerDTO();
    }
}
