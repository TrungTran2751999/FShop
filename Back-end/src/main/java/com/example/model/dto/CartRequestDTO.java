package com.example.model.dto;

import com.example.model.CartDetail;
import com.example.service.product.IProductService;
import com.example.service.product.ProductService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Range;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class CartRequestDTO {
    private List<CartBooking> listCartBooking;
    @Valid
    private CustomerDTO customerDTO;
    @NotEmpty(message = "address must be not empty")
    private String address;
    @Range(min = 1, message = "province must be not empty")
    private int province;
    @Range(min = 1, message = "district must be not empty")
    private int district;
    @Range(min = 1, message = "ward must be not empty")
    private int ward;
}
