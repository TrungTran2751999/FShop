package com.example.model.dto;

import com.example.model.CartDetail;
import com.example.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CartResponse {
    private List<CartDetail> listCartDetail;
    private Customer customer;
}
