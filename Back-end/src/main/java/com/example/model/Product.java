package com.example.model;

import com.example.model.dto.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int width;

    @Column(nullable = false)
    private int length;

    @Column(nullable = false)
    private int height;

    @Column(nullable = false, name = "create_at")
    private String createAt;

    @Column(nullable = false, name = "update_at")
    private String updateAt;

    @ManyToOne(targetEntity = Category.class)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    private Category categoryId;

    @Column(nullable = false, columnDefinition = "decimal(12,0)")
    private BigDecimal price;

    @Column(nullable = false)
    private long quantity;

    @Column(nullable = false, columnDefinition = "varchar(1000)")
    private String description;

    public ProductDTO toProductDTO(){
        return new ProductDTO(id, name, width, length, height, createAt, updateAt, categoryId, price, quantity, description);
    }

    @Override
    public String toString() {
        return "Product{" +
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
                '}';
    }
}
