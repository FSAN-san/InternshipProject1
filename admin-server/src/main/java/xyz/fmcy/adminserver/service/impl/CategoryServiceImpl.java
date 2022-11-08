package xyz.fmcy.adminserver.service.impl;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import xyz.fmcy.adminserver.mapper.CategoryMapper;
import xyz.fmcy.adminserver.service.CategoryService;
import xyz.fmcy.pt.dto.CategoryDto;
import xyz.fmcy.pt.pojo.Category;


import javax.annotation.Resource;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author 付高宏
 * @date 2022/10/28 10:24
 */
@Service
public class CategoryServiceImpl implements CategoryService {

    @Resource
    private CategoryMapper categoryMapper;

    @Override
    public List<Category> getCategoryList(int page, int len) {
        return categoryMapper.selectPage(new Page<>(page, len), null).getRecords();
    }

    @Override
    public int getCategoryNumber() {
        return categoryMapper.selectCount(null);
    }

    @Override
    public List<CategoryDto> loadCategory() {
        List<Category> categories = categoryMapper.selectList(null);
        return categories.stream().map(
                category -> new CategoryDto(category.getId(), category.getName(), category.getIcon())
        ).collect(Collectors.toList());
    }
}
