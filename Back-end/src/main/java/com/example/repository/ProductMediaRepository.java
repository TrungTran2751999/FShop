package com.example.repository;

import com.example.model.Product;
import com.example.model.ProductMedia;
import com.example.model.dto.ProductDTO;
import com.example.model.dto.ProductMediaDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductMediaRepository extends JpaRepository<ProductMedia, String> {
    ProductMedia findByProduct(Product product);
    void deleteByProduct(Product product);
    @Query(value = "SELECT NEW com.example.model.dto.ProductMediaDTO(" +
            "p.id," +
            "p.cloudId,"+
            "p.fileFolder,"+
            "p.fileName,"+
            "p.fileType,"+
            "p.fileUrl,"+
            "p.product"+
            ") FROM ProductMedia AS p order by p.product.id DESC")
    List<ProductMediaDTO> findAllProductMediaDTO();
    @Query(value = "SELECT NEW com.example.model.dto.ProductMediaDTO(" +
            "p.id," +
            "p.cloudId,"+
            "p.fileFolder,"+
            "p.fileName,"+
            "p.fileType,"+
            "p.fileUrl,"+
            "p.product"+
            ") FROM ProductMedia AS p WHERE p.product = :product" )
    ProductMediaDTO getProductMediaDTOByProductId(@Param("product") Product product);

}