package xyz.fmcy.adminserver.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.fmcy.adminserver.service.CategoryService;
import xyz.fmcy.adminserver.util.TreeDataUtil;
import xyz.fmcy.pt.pojo.Category;
import xyz.fmcy.pt.vo.CategoryVo;
import xyz.fmcy.pt.vo.TableDataList;

import javax.annotation.Resource;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 分类相关
 * @author 付高宏
 * @date 2022/10/28 14:28
 */
@Controller
@RequestMapping("/articles/category")
public class CategoryController {
    @Resource
    private CategoryService categoryService;

//    /**
//     * 管理系统查看分类
//     * @param page 页码
//     * @param limit 查询数量
//     */
//    @GetMapping("/admin/data")
//    @ResponseBody
//    public TableDataList<Category> getCategoryData(int page, int limit) {
//        List<Category> categoryList = categoryService.getCategoryList(page, limit);
//        int size = categoryList.size();
//        return new TableDataList<>(
//                size > 0 ? 0 : 1,
//                size > 0 ? "查询成功" + size + "条数据" : "查询失败",
//                categoryService.getCategoryNumber(),
//                new Timestamp(System.currentTimeMillis()),
//                categoryList
//        );
//    }

    /**
     * 类别数据
     */
    @ResponseBody
    @GetMapping("/data")
    public TableDataList<CategoryVo> getCategories() {
        List<CategoryVo> categoryVos = categoryService.loadCategory().stream().map(
                category -> new CategoryVo(category.getId(), category.getName(), category.getIcon())
        ).collect(Collectors.toList());
        TableDataList<CategoryVo> list = new TableDataList<>();
        list.setData(categoryVos);
        list.setCode(200);
        list.setTime(new Timestamp(System.currentTimeMillis()));
        list.setCount(categoryVos.size());
        return list;
    }
}
