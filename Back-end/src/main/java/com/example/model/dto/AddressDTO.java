package com.example.model.dto;

import com.example.model.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AddressDTO implements Validator {
    private long id;
    @NotNull
    private long provinceId;
    @NotNull
    private String provinceName;
    @NotNull
    private long districtId;
    @NotNull
    private String districtName;
    @NotNull
    private long wardId;
    @NotNull
    private String wardName;
    @NotNull
    private String address;
    public Address toAddress(){
        return new Address(id, provinceId, provinceName, districtId, districtName, wardId, wardName, address);
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return AddressDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        AddressDTO addressDTO = (AddressDTO) target;
        String address = addressDTO.getAddress();
        if(address.length()==0){
            errors.rejectValue("address","address.length","Address is not validdd");
        }
    }
}
