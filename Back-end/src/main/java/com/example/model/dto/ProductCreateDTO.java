package com.example.model.dto;

import com.example.model.Category;
import com.example.model.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProductCreateDTO implements Validator {
    public static boolean isCreate;
    private long id;
    @NotNull
    private String name;
    @NotNull(message = "Width must not be empty")
    private int width;
    @NotNull(message = "Length must not be empty")
    private int length;
    @NotNull(message = "Height must not be empty")
    private int height;
    private String createAt;
    private String updateAt;
    private Category categoryId;
    @NotNull
    private BigDecimal price;
    @NotNull
    private int quantity;
    @NotNull
    private String description;
    @NotNull
    private MultipartFile multipartFile;
    private long category;

    public ProductCreateDTO(String name, int width, int length, int height, String createAt, String updateAt, Category categoryId, BigDecimal price, int quantity, String description, MultipartFile multipartFile) {
        this.name = name;
        this.width = width;
        this.length = length;
        this.height = height;
        this.categoryId = categoryId;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.multipartFile = multipartFile;
    }
    public ProductCreateDTO(String name, int width, int length, int height, long category, BigDecimal price, int quantity, String description, MultipartFile multipartFile) {
        this.name = name;
        this.width = width;
        this.length = length;
        this.height = height;
        this.category = category;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.multipartFile = multipartFile;
    }

    public ProductCreateDTO(String name, int width, int length, int height, BigDecimal price, int quantity, String description, long category) {
        this.name = name;
        this.width = width;
        this.length = length;
        this.height = height;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.category = category;
    }

    public Product toProduct(){
        return new Product(id, name, width, length, height, createAt, updateAt, categoryId, price, quantity, description);
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return ProductCreateDTO.class.isAssignableFrom(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        ProductCreateDTO productCreateDTO = (ProductCreateDTO) target;
        String name = productCreateDTO.getName();
        BigDecimal price = productCreateDTO.getPrice();
        long categoryId = productCreateDTO.getCategory();
        int width = productCreateDTO.getWidth();
        int length = productCreateDTO.getLength();
        int height = productCreateDTO.getHeight();
        long quantity = productCreateDTO.getQuantity();
        String description = productCreateDTO.getDescription();
        MultipartFile image = productCreateDTO.getMultipartFile();
        if(width <= 0){
            errors.rejectValue("width", "width.value", "Width is not equal or less than 0");
        }
        if(price == null || price.compareTo(BigDecimal.ZERO) <=0 ){
            errors.rejectValue("price", "price.value", "price must not be null");
        }
        if(length <=0){
            errors.rejectValue("length", "length.value", "Length is not equal or less than 0");
        }
        if(height <= 0){
            errors.rejectValue("height", "height.value", "Height is not equal or less than 0");
        }
        if(quantity <=0){
            errors.rejectValue("quantity", "height.value", "Quantity is not equal or less than 0");
        }
        if(categoryId <= 0){
            errors.rejectValue("categoryId", "height.value", "Category is not exist");
        }
        if(name == null || name.isEmpty()){
            errors.rejectValue("name", "description.value", "Name must not be empty");
        }
        if(description == null || description.isEmpty()){
            errors.rejectValue("description", "description.value", "Description must not be empty");
        }
        if(image==null && isCreate){
            errors.rejectValue("multipartFile", "multipartFile.value","Image must not be empty");
        }
    }

    @Override
    public String toString() {
        return "ProductCreateDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", width=" + width +
                ", length=" + length +
                ", height=" + height +
                ", createAt='" + createAt + '\'' +
                ", updateAt='" + updateAt + '\'' +
                ", categoryId=" + categoryId +
                ", price=" + price +
                ", quantity=" + quantity +
                ", description='" + description + '\'' +
                ", multipartFile=" + multipartFile +
                ", category=" + category +
                '}';
    }
}
