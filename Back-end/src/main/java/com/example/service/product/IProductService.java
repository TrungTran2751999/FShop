package com.example.service.product;

import com.example.model.Product;
import com.example.model.dto.ProductCreateDTO;
import com.example.model.dto.ProductDTO;
import com.example.service.IGeneralService;

import java.io.IOException;
import java.util.List;

public interface IProductService extends IGeneralService<Product> {
    List<ProductDTO> findAllProductDTO();
    void createNewProduct(ProductCreateDTO productCreateDTO);
    void deleteProduct(long id) throws IOException;
    void updateProduct(ProductCreateDTO productCreateDTO);
}
