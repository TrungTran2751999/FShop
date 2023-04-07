package com.example.controller;

import com.example.exception.DataInputException;
import com.example.exception.ResourceNotFoundException;
import com.example.model.Category;
import com.example.model.Product;
import com.example.model.dto.ProductCreateDTO;
import com.example.model.dto.ProductDTO;
import com.example.model.dto.ProductMediaDTO;
import com.example.repository.ProductRepository;
import com.example.service.category.ICategoryService;
import com.example.service.product.IProductService;
import com.example.service.productMedia.IProductMediaService;
import com.example.service.productMedia.ProductMediaService;
import com.example.util.AppUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/food-machine/product")
public class ProductAPI {
    @Autowired
    private IProductService productService;
    @Autowired
    private ICategoryService categoryService;
    @Autowired
    private ProductMediaService productMediaService;
    @Autowired
    private AppUtil appUtil;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("")
    private ResponseEntity<?> findAllProduct(){
//      List<ProductDTO> listProduct = productService.findAllProductDTO();
        List<ProductMediaDTO> listProduct = productMediaService.findAllProductDTO();
        if(listProduct.isEmpty()){
            throw new ResourceNotFoundException("This resource is not exist !");
        }else{
            return new ResponseEntity<>(listProduct, HttpStatus.OK);
        }
    }
    @GetMapping("/{id}")
    private ResponseEntity<?> getProductById(@PathVariable("id") String productId){
        try {
            long id = Long.parseLong(productId);
            Optional<Product> productDTO = productService.findById(id);
            if(productDTO.isPresent()){
                ProductMediaDTO productMediaDTO = productMediaService.getProductMediaDTOByProductId(productDTO.get());
                return new ResponseEntity<>(productMediaDTO, HttpStatus.OK);
            }else{
                throw new DataInputException("Product is not exist !!!");
            }
        }catch (Exception e){
            throw new DataInputException("Product is not existtt !!!");
        }
    }
    @PostMapping("")
    private ResponseEntity<?> createNewProduct(@Validated @ModelAttribute ProductCreateDTO productCreateDTO, BindingResult bindingResult){
        ProductCreateDTO.isCreate = true;
        new ProductCreateDTO().validate(productCreateDTO,bindingResult);
        if(bindingResult.hasErrors()){
            return appUtil.mapErrorToResponse(bindingResult);
        }else{
            long categoryId = productCreateDTO.getCategory();
            Optional<Category> optcategory = categoryService.findById(categoryId);
            if(!optcategory.isPresent()){
                throw new DataInputException("Category is not exist !");
            }
            productCreateDTO.setCategoryId(optcategory.get());
            productService.createNewProduct(productCreateDTO);
        }
        return new ResponseEntity<>("Create Success", HttpStatus.OK);
    }
    @PatchMapping("/{id}")
    private ResponseEntity<?> updateProduct(@PathVariable("id") String productId, ProductCreateDTO productCreateDTO, BindingResult bindingResult){
        ProductCreateDTO.isCreate = false;
        new ProductCreateDTO().validate(productCreateDTO,bindingResult);
        if(bindingResult.hasErrors()){
            return appUtil.mapErrorToResponse(bindingResult);
        }else{
            try {
                long id = Long.parseLong(productId);
                productCreateDTO.setId(id);
                long categoryId = productCreateDTO.getCategory();
                Optional<Category> optcategory = categoryService.findById(categoryId);
                if(!optcategory.isPresent()){
                    throw new DataInputException("Category is not exist !");
                }
                productCreateDTO.setCategoryId(optcategory.get());
                productService.updateProduct(productCreateDTO);
            }catch (Exception e){
                throw new DataInputException("Product is not exist !!!");
            }
        }
        return new ResponseEntity<>("Update Success", HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteProduct(@PathVariable("id") String productId){
        try{
            long id = Long.parseLong(productId);
            Optional<Product> product = productService.findById(id);
            if(product.isPresent()){
                productService.deleteProduct(id);
                return new ResponseEntity<>("Delete Successfully !!!", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("This product not exist !!!", HttpStatus.NOT_FOUND);
            }
        }catch (Exception e){
            return new ResponseEntity<>("This product not exist !!!", HttpStatus.NOT_FOUND);
        }
    }
}
