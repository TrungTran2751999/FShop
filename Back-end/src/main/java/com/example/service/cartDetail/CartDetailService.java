package com.example.service.cartDetail;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Product;
import com.example.model.dto.CartDTO;
import com.example.model.dto.CartDetailDTO;
import com.example.repository.CartDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CartDetailService implements ICartDetailService{
    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Override
    public List<CartDetail> findAll() {
        return cartDetailRepository.findAll();
    }

    @Override
    public Optional<CartDetail> findById(Long id) {
        return cartDetailRepository.findById(id);
    }

    @Override
    public CartDetail getById(Long id) {
        return cartDetailRepository.getById(id);
    }

    @Override
    public CartDetail save(CartDetail cartDetail) {
        return cartDetailRepository.save(cartDetail);
    }

    @Override
    public void delete(CartDetail cartDetail) {
        cartDetailRepository.delete(cartDetail);
    }

    @Override
    public void deleteById(Long id) {
        cartDetailRepository.deleteById(id);
    }

    @Override
    public List<CartDetail> findCartDetailByCart(Cart cart) {
        return cartDetailRepository.findCartDetailsByCart(cart);
    }

    @Override
    public List<CartDetailDTO> findCartDetailByCartDTO(Cart cart) {
        return cartDetailRepository.findCartDetailsByCartDTO(cart);
    }

}
