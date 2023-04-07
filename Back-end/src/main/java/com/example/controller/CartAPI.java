package com.example.controller;

import com.example.exception.DataInputException;
import com.example.model.Cart;
import com.example.model.Product;
import com.example.model.dto.*;
import com.example.repository.CartDetailRepository;
import com.example.service.cart.CartService;
import com.example.service.cartDetail.ICartDetailService;
import com.example.service.customer.ICustomerService;
import com.example.service.product.IProductService;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food-machine/cart")
public class CartAPI {
    @Autowired
    private CartService cartService;
    @Autowired
    private ICartDetailService cartDetailService;
    @Autowired
    private IProductService productService;
    @Autowired
    private AppUtil appUtil;
    @GetMapping("")
    private ResponseEntity<?> getAllCart(){
        List<Cart> cartList = cartService.findAll();
        return new ResponseEntity<>(cartList, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    private ResponseEntity<?> getCartById(@PathVariable("id") String cartId){
        try {
            long id = Long.parseLong(cartId);
            Optional<Cart> optCart = cartService.findById(id);
            if(optCart.isPresent()){
                return new ResponseEntity<>(optCart.get(),HttpStatus.FOUND);
            }else{
                throw new DataInputException("This cart is not exist");
            }
        }catch (Exception e){
            throw new DataInputException("This cart is not exist");
        }
    }
    @PostMapping("/{id}")
    private ResponseEntity<?> updateStatus(@PathVariable("id") String cartId){
        try {
            long id = Long.parseLong(cartId);
            Optional<Cart> optCart = cartService.findById(id);
            if(optCart.isPresent()){
                if(optCart.get().getStatus() == 2){
                    throw new DataInputException("This cart have booked");
                }else{
                    cartService.updateCart(optCart.get().toCartDTO());
                    return new ResponseEntity<>("Update successfully !",HttpStatus.OK);
                }
            }else{
                throw new DataInputException("This cart is not exist");
            }
        }catch (Exception e){
            throw new DataInputException("This cart is not existtt");
        }
    }
    @PostMapping("")
    private ResponseEntity<?> createNewCart(@Validated @RequestBody CartRequestDTO cartRequestDTOs, BindingResult bindingResult){
        if(bindingResult.hasErrors()) {
            return appUtil.mapErrorToResponse(bindingResult);
        }
        for (CartBooking cartBooking : cartRequestDTOs.getListCartBooking()) {
            Optional<Product> optproduct = productService.findById(cartBooking.getProductId());
            if (!optproduct.isPresent()) {
                throw new DataInputException("Product has id= " + cartBooking.getProductId() + " is not exist");
            }else if(cartBooking.getQuantity() > optproduct.get().getQuantity()){
                throw new DataInputException("Product quantity not enough to buy");
            }
        }
        cartService.createNewCart(cartRequestDTOs);
        return new ResponseEntity<>("Booking success", HttpStatus.OK);
    }
    @GetMapping("/cart-detail/{id}")
    private ResponseEntity<?> findCartByProduct(@PathVariable Long id){
        Optional<Cart> optCart = cartService.findById(id);
        if(optCart.isPresent()){
            List<CartDetailDTO> listCartDTO = cartDetailService.findCartDetailByCartDTO(optCart.get());
            return new ResponseEntity<>(listCartDTO, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/status/{status}")
    private ResponseEntity<?> findCartsByStatus(@PathVariable int status){
        List<CartDTO> listCart = cartService.findCartsByStatus(status);
        if(!listCart.isEmpty()){
            return new ResponseEntity<>(listCart, HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Not found", HttpStatus.NOT_FOUND);
        }
    }
}
