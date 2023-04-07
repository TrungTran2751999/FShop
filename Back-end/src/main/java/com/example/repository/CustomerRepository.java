package com.example.repository;

import com.example.model.Customer;
import com.example.model.dto.CustomerDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    @Query(value = "SELECT NEW com.example.model.dto.CustomerDTO(" +
            "c.id,"+
            "c.email,"+
            "c.name,"+
            "c.phone,"+
            "c.address"+") FROM Customer AS c")
    List<CustomerDTO> findAllCustomerDTO();
}