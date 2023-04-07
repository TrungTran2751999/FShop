package com.example.model;

import com.example.model.dto.CustomerDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String phone;

    @ManyToOne(targetEntity = Address.class)
    @JoinColumn(name="address_id", referencedColumnName = "id", nullable = false)
    private Address address;

    public CustomerDTO toCustomerDTO(){
        return new CustomerDTO(id, email, name,phone, address);
    }
}
