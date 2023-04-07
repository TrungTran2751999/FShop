package com.example.service.productMedia;

import com.example.model.Product;
import com.example.model.ProductMedia;
import com.example.model.dto.ProductDTO;
import com.example.model.dto.ProductMediaDTO;
import com.example.repository.ProductMediaRepository;
import com.example.service.upload.UploadService;
import com.example.util.AppUtil;
import com.example.util.UploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@Service
@Transactional
public class ProductMediaService{
    @Autowired
    private ProductMediaRepository productMediaRepository;
    @Autowired
    private UploadService uploadService;
    @Autowired
    private UploadUtil uploadUtil;

    public List<ProductMedia> findAll() {
        return productMediaRepository.findAll();
    }

    public Optional<ProductMedia> findById(String id) {
        return productMediaRepository.findById(id);
    }

    public ProductMedia getById(String id) {
        return productMediaRepository.getById(id);
    }

    public ProductMedia save(ProductMedia productMedia) {
        return productMediaRepository.save(productMedia);
    }

    public void delete(ProductMedia productMedia) {
        productMediaRepository.delete(productMedia);
    }

    public void deleteById(String id) {
        productMediaRepository.deleteById(id);
    }
    public ProductMedia findByProduct(Product product){
        return productMediaRepository.findByProduct(product);
    }
    public void deleteByProduct(Product product) throws IOException {
        ProductMedia productMedia = findByProduct(product);
        String pulicId = String.format("%s/%s",uploadUtil.IMAGE_UPLOAD_FOLDER,productMedia.getId());
        uploadService.destroyImage(pulicId, uploadUtil.buildImageDestroyParams(product,pulicId));
        productMediaRepository.deleteByProduct(product);
    }
    public List<ProductMediaDTO> findAllProductDTO(){
        return productMediaRepository.findAllProductMediaDTO();
    };
    public ProductMediaDTO getProductMediaDTOByProductId(Product product){

        return productMediaRepository.getProductMediaDTOByProductId(product);
    }
}
