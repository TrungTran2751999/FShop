package com.example.service.category;

import com.example.model.Category;
import com.example.model.dto.CategoryDTO;
import com.example.service.IGeneralService;

import java.util.List;

public interface ICategoryService extends IGeneralService<Category> {
    List<CategoryDTO> findAllCategoryDto();
    CategoryDTO findCategoryByName(String name);
    List<CategoryDTO> findAllCategoryByName(String name);
}
