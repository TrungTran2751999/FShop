package com.example.service.cart;

import com.example.model.Cart;
import com.example.model.CartDetail;
import com.example.model.Customer;
import com.example.model.Product;
import com.example.model.dto.CartBooking;
import com.example.model.dto.CartDTO;
import com.example.model.dto.CartDetailDTO;
import com.example.model.dto.CartRequestDTO;
import com.example.repository.CartRepository;
import com.example.service.cartDetail.ICartDetailService;
import com.example.service.customer.ICustomerService;
import com.example.service.product.ProductService;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class CartService implements ICartService{
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ICartDetailService cartDetailService;
    @Autowired
    private ICustomerService customerService;
    @Autowired
    private ProductService productService;
    @Autowired
    private AppUtil appUtil;

    @Override
    public List<Cart> findAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> findById(Long id) {
        return cartRepository.findById(id);
    }

    @Override
    public Cart getById(Long id) {
        return cartRepository.getById(id);
    }

    @Override
    public Cart save(Cart cart) {
        return cartRepository.save(cart);
    }

    @Override
    public void delete(Cart cart) {
        cartRepository.delete(cart);
    }

    @Override
    public void deleteById(Long id) {
        cartRepository.deleteById(id);
    }

    @Override
    public void createNewCart(CartRequestDTO cartRequestDTO) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String toDay = dateFormat.format(new Date());
        Customer customer = customerService.createNewCustomer(cartRequestDTO.getCustomerDTO().toCustomer());

        Cart cart = new Cart();
        cart.setCreateAt(toDay);
        cart.setStatus(1);
        cart.setCustomer(customer);
        Cart saveCart = save(cart);

        BigDecimal sum = new BigDecimal(0);
        for (CartBooking cartBooking : cartRequestDTO.getListCartBooking()) {
            CartDetail cartDetail = new CartDetail();
            Optional<Product> product = productService.findById(cartBooking.getProductId());

            cartDetail.setCart(saveCart);
            cartDetail.setCreateAt(toDay);
            cartDetail.setUpdateAt(toDay);
            cartDetail.setProduct(product.get());
            cartDetail.setQuantity(cartBooking.getQuantity());
            cartDetailService.save(cartDetail);


            BigDecimal productQuantity = new BigDecimal(cartDetail.getQuantity());
            BigDecimal price = product.get().getPrice().multiply(productQuantity);


            sum = sum.add(price);
        }
        cart.setTotalPrice(sum);
        save(cart);
    }

    @Override
    public Cart updateCart(CartDTO cartDTO) {
        Cart cart = cartDTO.toCart();
        cart.setStatus(2);
        List<CartDetail> listCart = cartDetailService.findCartDetailByCart(cart);
        for(int i=0; i< listCart.size(); i++){
            Product product = listCart.get(i).getProduct();
            product.setQuantity(product.getQuantity()- listCart.get(i).getQuantity());
            productService.save(product);
        }
        return save(cart);
    }

    @Override
    public List<CartDTO> findCartsByStatus(int status) {
        return cartRepository.findCartsByStatus(status);
    }
}
