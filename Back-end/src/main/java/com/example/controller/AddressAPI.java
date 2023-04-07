package com.example.controller;

import com.example.model.dto.AddressDTO;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
@Component
public class AddressAPI {
    @Autowired
    private AppUtil appUtil;
    public void checkAddress(@RequestBody AddressDTO addressDTO, BindingResult bindingResult){
        new AddressDTO().validate(addressDTO, bindingResult);
        if(bindingResult.hasErrors()){
            appUtil.mapErrorToResponse(bindingResult);
        }
    }
}
