package com.example.service.cartDetail;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Product;
import com.example.model.dto.CartDTO;
import com.example.model.dto.CartDetailDTO;
import com.example.service.IGeneralService;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface ICartDetailService extends IGeneralService<CartDetail> {
    List<CartDetail> findCartDetailByCart(Cart cart);
    List<CartDetailDTO> findCartDetailByCartDTO(Cart cart);
}
