package xyz.fmcy.adminserver.service;

import xyz.fmcy.pt.dto.FileContent;

import java.io.File;

/**
 * 阿里云短信服务
 *
 * @author 付高宏
 * @date 2022/10/31 15:35
 */
public interface AlyService {

    String CATEGORY_PREFIX = "Category:";

    /**
     * 发送登录短信消息
     * @param phone 手机号
     * @return 发送状态
     */
    String loginSms(String phone);

    /**
     * 产生随机验证码
     * @return 验证码
     */
    String randCategory();

    /**
     * 上传文件到OSS
     * @param filetreeName 文件树名
     * @param fileName 文件名
     * @param file 文件对象
     * @return 上传状态
     */
    Boolean uploadFile(String filetreeName, String fileName, File file);

    /**
     * 下载文件
     * @param filetreeName 文件树名
     * @param fileName 文件对象
     * @return 文件内容
     */
    File loadFile(String filetreeName, String fileName);
}
