package xyz.fmcy.adminserver.service;

import xyz.fmcy.pt.dto.CategoryDto;
import xyz.fmcy.pt.pojo.Category;

import java.util.List;

/**
 * @author 付高宏
 * @date 2022/10/28 10:24
 */
public interface CategoryService {

    List<Category> getCategoryList(int page,int len);

    int getCategoryNumber();

    List<CategoryDto> loadCategory();
}
