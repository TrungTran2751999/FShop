package com.example.model.dto;

import com.example.model.Product;
import com.example.model.ProductMedia;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductMediaDTO {
    private String id;
    private String cloudId;
    private String fileFolder;
    private String fileName;
    private String fileType;
    private String fileUrl;
    private ProductDTO product;

    public ProductMediaDTO(String id, String cloudId, String fileFolder, String fileName, String fileType, String fileUrl, Product product) {
        this.id = id;
        this.cloudId = cloudId;
        this.fileFolder = fileFolder;
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileUrl = fileUrl;
        this.product = product.toProductDTO();
    }
    public ProductMedia toProductMedia(){
        return new ProductMedia(id, cloudId, fileFolder, fileName, fileType, fileUrl, product.toProduct());
    }
}
