package com.example.service.cart;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Customer;
import com.example.model.dto.CartDTO;
import com.example.model.dto.CartDetailDTO;
import com.example.model.dto.CartRequestDTO;
import com.example.service.IGeneralService;
import org.springframework.validation.BindingResult;

import java.util.ArrayList;
import java.util.List;

public interface ICartService extends IGeneralService<Cart> {
    void createNewCart(CartRequestDTO cartRequestDTO);
    Cart updateCart(CartDTO cartDTO);
    List<CartDTO> findCartsByStatus(int status);
}
