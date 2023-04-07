package com.example.repository;

import com.example.model.Category;
import com.example.model.dto.CategoryDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.naming.Name;
import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query(value = "SELECT NEW com.example.model.dto.CategoryDTO(c.id, c.name) FROM Category AS c")
    List<CategoryDTO> findAllCategory();
    CategoryDTO findCategoryByName(String name);

    @Query(value = "SELECT NEW com.example.model.dto.CategoryDTO(c.id, c.name) FROM Category AS c WHERE c.name=:name")
    List<CategoryDTO> findAllCategoryByName(@Param("name") String name);
}