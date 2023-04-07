package com.example.service.customer;

import com.example.model.Customer;
import com.example.model.dto.CustomerDTO;
import com.example.service.IGeneralService;

import java.util.List;

public interface ICustomerService extends IGeneralService<Customer> {
    List<CustomerDTO> findAllCustomerDTO();
    Customer createNewCustomer(Customer customer);
}
