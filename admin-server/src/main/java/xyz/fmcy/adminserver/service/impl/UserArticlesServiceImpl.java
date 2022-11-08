package xyz.fmcy.adminserver.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.stereotype.Service;
import xyz.fmcy.adminserver.mapper.ArticlesListMapper;
import xyz.fmcy.adminserver.mapper.LockMapper;
import xyz.fmcy.adminserver.mapper.UserMapper;
import xyz.fmcy.adminserver.service.UserArticlesService;
import xyz.fmcy.pt.dto.ArticlesInfoDto;
import xyz.fmcy.pt.dto.UserDto;
import xyz.fmcy.pt.pojo.ArticlesInfo;
import xyz.fmcy.pt.pojo.Lock;
import xyz.fmcy.pt.vo.ArticlesInfoPage;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author 付高宏
 * @date 2022/11/3 17:12
 */
@Service
public class UserArticlesServiceImpl implements UserArticlesService {

    @Resource
    private ArticlesListMapper articlesListMapper;
    @Resource
    private UserMapper userMapper;
    @Resource
    private LockMapper lockMapper;

    @Override
    public IPage<ArticlesInfoDto> getArticlesInfo(ArticlesInfoPage articlesInfoPage) {
        QueryWrapper<ArticlesInfo> wrapper = new QueryWrapper<>();
        LambdaQueryWrapper<ArticlesInfo> lambdaQueryWrapper = wrapper
                .lambda()
                .like(ArticlesInfo::getTitle, articlesInfoPage.getTitle());
        Integer authorId = articlesInfoPage.getAuthorId();
        if (authorId != null && authorId != 0) {
            if (lockMapper.selectById(authorId) == null) {
                lambdaQueryWrapper.eq(ArticlesInfo::getAuthor, authorId);
            } else {
                return new Page<ArticlesInfoDto>()
                        .setCurrent(articlesInfoPage.getCurrent())
                        .setSize(0)
                        .setTotal(0);
            }
        }
        List<Lock> locks = lockMapper.selectList(null);
        if (locks != null) {
            lambdaQueryWrapper.notIn(ArticlesInfo::getAuthor, locks.stream().map(Lock::getUid).collect(Collectors.toList()));
        }
        String[] tags = articlesInfoPage.getTags();
        assert tags != null;
        for (String s : tags) {
            lambdaQueryWrapper.like(ArticlesInfo::getTag, ";" + s + ";");
        }
        Double leftPrice = articlesInfoPage.getLeftPrice();
        if (leftPrice != null && leftPrice > 0) {
            lambdaQueryWrapper.gt(ArticlesInfo::getPrice, leftPrice);
        }
        Double rightPrice = articlesInfoPage.getRightPrice();
        if (rightPrice != null && rightPrice > 0) {
            lambdaQueryWrapper.lt(ArticlesInfo::getPrice, rightPrice);
        }
        Boolean desc = articlesInfoPage.getDateDesc();
        if (Boolean.TRUE.equals(desc)) {
            lambdaQueryWrapper.orderByDesc(ArticlesInfo::getDate);
        } else {
            lambdaQueryWrapper.orderByAsc(ArticlesInfo::getDate);
        }
        IPage<ArticlesInfo> articlesInfos = articlesListMapper.selectPage(new Page<>(articlesInfoPage.getCurrent(), 5L), wrapper);
        Page<ArticlesInfoDto> result = new Page<>();
        List<ArticlesInfoDto> collect = articlesInfos.getRecords().stream().map(a -> new ArticlesInfoDto(
                        a.getId(),
                        a.getImg(),
                        a.getTitle(),
                        a.getSubTitle(),
                        Arrays.stream(a.getTag().split(";")).filter(s -> !"".equals(s)).toArray(String[]::new),
                        a.getDate(),
                        a.getPrice(),
                        new UserDto(userMapper.selectById(a.getAuthor())).getUsername()
                ))
                .collect(Collectors.toList());
        result.setRecords(collect);
        result.setTotal(articlesInfos.getTotal());
        result.setCurrent(articlesInfos.getCurrent());
        return result;
    }
}
