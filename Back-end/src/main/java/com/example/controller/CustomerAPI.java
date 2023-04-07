package com.example.controller;

import com.example.exception.DataInputException;
import com.example.model.Customer;
import com.example.model.dto.CustomerDTO;
import com.example.service.address.AddressService;
import com.example.service.customer.CustomerService;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food-machine/customer")
public class CustomerAPI {
    @Autowired
    private CustomerService customerService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private AppUtil appUtil;
    @Autowired
    private AddressAPI addressAPI;
    @GetMapping("")
    private ResponseEntity<?> findAllCustomer(){
        List<CustomerDTO> listCustomer = customerService.findAllCustomerDTO();
        return new ResponseEntity<>(listCustomer, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    private ResponseEntity<?> findCustomerById(@PathVariable("id") String customerId){
        try{
            long id = Long.parseLong(customerId);
            Optional<Customer> customer = customerService.findById(id);
            if(customer.isPresent()){
                CustomerDTO customerDTO = customer.get().toCustomerDTO();
                return new ResponseEntity<>(customerDTO, HttpStatus.OK);
            }else{
                return new ResponseEntity<>("Customer is not exist !!!", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            throw new DataInputException("Customer is not exist !!!");
        }
    }
    @PostMapping("")
    private ResponseEntity<?> createNewCustomer(@RequestBody CustomerDTO customerDTO, BindingResult bindingResult){
        new CustomerDTO().validate(customerDTO, bindingResult);
        addressAPI.checkAddress(customerDTO.getAddress(), bindingResult);
        if(bindingResult.hasErrors()){
            return appUtil.mapErrorToResponse(bindingResult);
        }else{
            Customer customer = customerDTO.toCustomer();
            customerService.createNewCustomer(customer);
            return new ResponseEntity<>("Create Customer Successfully !!!", HttpStatus.CREATED);
        }
    }
}
