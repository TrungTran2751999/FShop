package com.example.model.dto;

import com.example.model.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.Column;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class CategoryDTO implements Validator {
    private long id;
    private String name;
    public CategoryDTO(String name){
        this.name= name;
    }
    public Category toCategory(){
        return new Category(id, name);
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return CategoryDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        CategoryDTO categoryDTO = (CategoryDTO) target;
        String name = categoryDTO.getName();
        if(name ==null||name.isEmpty()){
            errors.rejectValue("name","name.length", "Category name must be not empty");
        }
    }
}
