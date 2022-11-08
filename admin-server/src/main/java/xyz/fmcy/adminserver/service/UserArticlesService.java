package xyz.fmcy.adminserver.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import xyz.fmcy.pt.dto.ArticlesInfoDto;
import xyz.fmcy.pt.vo.ArticlesInfoPage;

/**
 * @author 付高宏
 * @date 2022/11/3 17:04
 */
public interface UserArticlesService {
    IPage<ArticlesInfoDto> getArticlesInfo(ArticlesInfoPage articlesInfoPage);



}
