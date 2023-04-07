package com.example.controller;

import com.example.exception.DataInputException;
import com.example.exception.ResourceNotFoundException;
import com.example.model.Category;
import com.example.model.dto.CategoryDTO;
import com.example.service.category.ICategoryService;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food-machine/category")
public class CategoryAPI {
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private AppUtil appUtil;

    @GetMapping("")
    private ResponseEntity<?> getAllCategory(){
        List<CategoryDTO> listCategoryDTO = categoryService.findAllCategoryDto();
        return new ResponseEntity<>(listCategoryDTO, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    private ResponseEntity<?> getCategoryById(@PathVariable("id") String categoryId){
        try{
            long id = Long.parseLong(categoryId);
            Optional<Category> categoryDTO = categoryService.findById(id);
            if(categoryDTO.isPresent()){
                return new ResponseEntity<>(categoryDTO.get().toCategoryDTO(), HttpStatus.OK);
            }else{
                throw new ResourceNotFoundException("Category is not exist");
            }
        }catch (Exception e){
            throw new ResourceNotFoundException("Category is not exist");
        }
    }
    @PostMapping("")
    private ResponseEntity<?> postCategory(@RequestBody CategoryDTO categoryDTO, BindingResult bindingResult){
        new CategoryDTO().validate(categoryDTO,bindingResult);
        if(bindingResult.hasErrors()){
            return appUtil.mapErrorToResponse(bindingResult);
        }
        if(categoryService.findCategoryByName(categoryDTO.getName())==null){
            categoryService.save(categoryDTO.toCategory());
            return new ResponseEntity<>("Create category successfully", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Name have existed",HttpStatus.BAD_REQUEST);
        }
    }
    @PatchMapping("/{id}")
    private ResponseEntity<?> updateCategory(@PathVariable("id") String categoryId, @RequestBody CategoryDTO categoryDTO, BindingResult bindingResult){
        new CategoryDTO().validate(categoryDTO,bindingResult);
        if(bindingResult.hasErrors()){
            return appUtil.mapErrorToResponse(bindingResult);
        }
        try {
            long id = Long.parseLong(categoryId);
            categoryDTO.setId(id);
            List<CategoryDTO> listCategory = categoryService.findAllCategoryByName(categoryDTO.getName());
            System.out.println(listCategory);
            if(listCategory.size() > 0){
                return new ResponseEntity<>("Category have been existed", HttpStatus.NOT_FOUND);
            }else {
                categoryService.save(categoryDTO.toCategory());
                return new ResponseEntity<>("Update category successfully", HttpStatus.OK);
            }
        }catch (Exception e){
            throw new DataInputException("Category is not exist");
        }
    }
}
