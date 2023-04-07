package com.example.service.product;

import com.example.exception.DataInputException;
import com.example.exception.ResourceNotFoundException;
import com.example.model.Product;
import com.example.model.ProductMedia;
import com.example.model.dto.ProductCreateDTO;
import com.example.model.dto.ProductDTO;
import com.example.repository.ProductMediaRepository;
import com.example.repository.ProductRepository;
import com.example.service.productMedia.ProductMediaService;
import com.example.service.upload.UploadService;
import com.example.util.UploadUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@Service
@Transactional
public class ProductService implements IProductService{
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductMediaService productMediaService;
    @Autowired
    private ProductMediaRepository productMediaRepository;
    @Autowired
    private UploadService uploadService;
    @Autowired
    private UploadUtil uploadUtil;


    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product getById(Long id) {
        return productRepository.getById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void delete(Product product) {
        productRepository.delete(product);
    }

    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductDTO> findAllProductDTO() {
        return productRepository.findAllProductDTO();
    }
    @Override
    public void createNewProduct(ProductCreateDTO productCreateDTO){

        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String toDay = dateFormat.format(new Date());
        productCreateDTO.setCreateAt(toDay);
        productCreateDTO.setUpdateAt(toDay);
        Product product = save(productCreateDTO.toProduct());
        String fileType = productCreateDTO.getMultipartFile().getContentType();
        ProductMedia productMedia = new ProductMedia();
        if(fileType != null){
            fileType = fileType.substring(0,5);
            productMedia.setId(null);
            productMedia.setFileType(fileType);
            productMedia.setProduct(product);
            productMediaRepository.save(productMedia);
        }
        uploadAndSaveImage(productCreateDTO, productMedia);
    }

    @Override
    public void deleteProduct(long id) throws IOException {
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent()){
            productMediaService.deleteByProduct(product.get());
            productRepository.deleteById(id);
        }else{
            throw new ResourceNotFoundException("This product is not exist !!!");
        }
    }

    @Override
    public void updateProduct(ProductCreateDTO productCreateDTO) {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String toDay = dateFormat.format(new Date());
        productCreateDTO.setCreateAt(toDay);
        productCreateDTO.setUpdateAt(toDay);
        if(productCreateDTO.getMultipartFile()== null){
            save(productCreateDTO.toProduct());
        }else{
            Product product = save(productCreateDTO.toProduct());
            String fileType = productCreateDTO.getMultipartFile().getContentType();
            ProductMedia productMedia = productMediaRepository.getProductMediaDTOByProductId(product).toProductMedia();
            if(fileType != null){
                fileType = fileType.substring(0,5);
                productMedia.setFileType(fileType);
                productMedia.setProduct(product);
                productMediaRepository.save(productMedia);
            }
            uploadAndSaveImage(productCreateDTO, productMedia);
        }
    }

    private void uploadAndSaveImage(ProductCreateDTO productCreateDTO, ProductMedia productMedia){
        try {
            Map uploadResult = uploadService.uploadImage(productCreateDTO.getMultipartFile(), uploadUtil.buildImageUploadParams(productMedia));
            String fileUrl = (String) uploadResult.get("secure_url");
            String fileFormat = (String) uploadResult.get("format");

            productMedia.setFileName(productMedia.getId()+"."+fileFormat);
            productMedia.setFileUrl(fileUrl);
            productMedia.setFileFolder(uploadUtil.IMAGE_UPLOAD_FOLDER);
            productMedia.setCloudId(productMedia.getFileFolder()+"/"+productMedia.getId());
            productMediaRepository.save(productMedia);
        } catch (IOException e) {
            throw new DataInputException("Image upload failed !!!");
        }
    }
}
