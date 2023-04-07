package com.example.model;

import com.example.model.dto.CartDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "total_price", columnDefinition = "decimal(12,0)")
    private BigDecimal totalPrice;

    @Column(name = "create_at", nullable = false)
    private String createAt;
    @Column(name = "status", nullable = false)
    private int status;

    @ManyToOne(targetEntity = Customer.class)
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    private Customer customer;

    public CartDTO toCartDTO(){
        return new CartDTO(id, totalPrice, createAt, status, customer.toCustomerDTO());
    }
}
