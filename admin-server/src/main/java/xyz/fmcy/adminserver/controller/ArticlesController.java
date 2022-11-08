package xyz.fmcy.adminserver.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import xyz.fmcy.adminserver.service.UserArticlesService;
import xyz.fmcy.adminserver.service.UserService;
import xyz.fmcy.pt.dto.ArticlesInfoDto;
import xyz.fmcy.pt.vo.*;

import javax.annotation.Resource;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * 文章相关
 * @author 付高宏
 * @date 2022/11/3 17:40
 */
@RestController
@RequestMapping("/articles")
public class ArticlesController {

    @Resource
    private UserArticlesService userArticlesService;

    @Resource
    private UserService userService;

    /**
     * 文章简介
     * @param page 查询条件
     */
    @RequestMapping("/briefly/data")
    public PageDataVo<ArticlesInfoVo> data(ArticlesInfoPage page) {
        IPage<ArticlesInfoDto> articlesInfo = userArticlesService.getArticlesInfo(page);
        PageDataVo<ArticlesInfoVo> pageDataVo = new PageDataVo<>();
        pageDataVo.setCode(200);
        pageDataVo.setData(new Page<ArticlesInfoVo>().setRecords(articlesInfo.getRecords().stream().map(
                a -> new ArticlesInfoVo(
                        a.getId(),
                        a.getImg(),
                        a.getTitle(),
                        a.getSubTitle(),
                        a.getTags(),
                        a.getDate(),
                        a.getPrice(),
                        a.getAuthor()
                )
        ).collect(Collectors.toList())).setTotal(articlesInfo.getTotal()).setCurrent(articlesInfo.getCurrent()));
        return pageDataVo;
    }

    /**
     * 依据分类标签名搜索作者
     * @param tag 标签
     */
    @GetMapping("/author/category")
    public ResponseMsg<Set<Map<String, Object>>> authorList(String tag) {
        Set<Map<String, Object>> list = userService.authorListByTag(tag);
        ResponseMsg<Set<Map<String, Object>>> responseMsg = new ResponseMsg<>();
        responseMsg.setCode(200);
        responseMsg.setData(list);
        return responseMsg;
    }
}
