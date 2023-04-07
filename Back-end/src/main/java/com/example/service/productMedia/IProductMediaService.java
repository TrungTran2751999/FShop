package com.example.service.productMedia;
import com.example.model.Product;
import com.example.model.ProductMedia;
import com.example.model.dto.ProductMediaDTO;
import com.example.service.IGeneralService;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductMediaService extends IGeneralService<ProductMedia> {
    void deleteProductMediaByProduct(Product product);
    List<ProductMediaDTO> findAllProductMediaDTO();
}
