package com.example.model.dto;

import com.example.model.Address;
import com.example.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class CustomerDTO implements Validator {
    private long id;
    @NotEmpty(message = "email must be not empty")
    private String email;
    @NotEmpty(message = "name must be not empty")
    private String name;
    @NotEmpty(message = "phone must be not empty")
    private String phone;
    @NotNull
    @Valid
    private AddressDTO address;

    public CustomerDTO(long id, String email, String name, String phone, Address address) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.address = address.toAddressDTO();
    }
    public Customer toCustomer(){
        return new Customer(id, email, name, phone, address.toAddress());
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return CustomerDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CustomerDTO customerDTO = (CustomerDTO) target;
        String email = customerDTO.getEmail();
        String name = customerDTO.getName();
        String phone = customerDTO.getPhone();
        if(name.length()==0){
            errors.rejectValue("name", "name.length", "Name is not empty");
        }

        if(name.length() > 20){
            errors.rejectValue("name", "name.length", "Name must be less than 20 letters");
        }

        if(email.length()==0){
            errors.rejectValue("email", "email.length", "Email is not empty");
        }

        if(!email.matches("^[\\w-\\.]{5,20}@([\\w-]+\\.)+[\\w-]{2,4}$")){
            errors.rejectValue("email", "email.matches", "Email is not valid");
        };
        if(phone.length() ==0){
            errors.rejectValue("phone", "phone.length", "Phone is not empty");
        }
        if(!phone.matches("^0[2789][0-9]{8}$")){
            errors.rejectValue("phone", "phone.matches", "Phone is not valid");
        }
    }
}
