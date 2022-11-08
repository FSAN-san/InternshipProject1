package xyz.fmcy.adminserver.service.impl;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.dysmsapi20170525.models.SendSmsRequest;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.tea.TeaException;
import com.aliyun.teautil.Common;
import com.aliyun.teautil.models.RuntimeOptions;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import xyz.fmcy.adminserver.service.AlyService;
import xyz.fmcy.pt.dto.FileContent;

import javax.annotation.Resource;
import java.io.*;
import java.time.Duration;
import java.util.UUID;

/**
 * @author 付高宏
 * @date 2022/10/31 15:37
 */
@Service
public class AlyServiceImpl implements AlyService {

    @Resource
    private Client alySmsClient;

    @Resource
    private OSS alyOssClient;

    @Resource
    private RedisTemplate<String, String> redisTemplate;

    @Value("${aliyu.sms.sign-name}")
    private String signName;
    @Value("${aliyu.sms.template-code}")
    private String templateCode;

    @Value("${aliyu.oss.endpoint}")
    private String endpoint;

    @Value("${aliyu.oss.bucket-name}")
    private String bucketName;

    @Override
    public String loginSms(String phone) {
        /*检查验证码是否过期*/
        if (Boolean.TRUE.equals(redisTemplate.hasKey(CATEGORY_PREFIX + phone))) {
            return "验证码还未过期:验证码过期时间为2小时";
        }
        /*产生一枚验证码*/
        String code = randCategory();
        /*验证码存在Redis*/
        redisTemplate.opsForValue().set(CATEGORY_PREFIX + phone, code);
        /*设置过期时间*/
        redisTemplate.expire(CATEGORY_PREFIX + phone, Duration.ofHours(2));
        /*发送短信*/
        SendSmsRequest sendSmsRequest = new SendSmsRequest()
                .setSignName(signName)
                .setTemplateCode(templateCode)
                .setPhoneNumbers(phone)
                .setTemplateParam("{\"code\":\"" + code + "\"}");
        RuntimeOptions runtime = new RuntimeOptions();
        try {
            return alySmsClient.sendSmsWithOptions(sendSmsRequest, runtime).body.message;
        } catch (TeaException error) {
            Common.assertAsString(error.message);
            return "发送失败";
        } catch (Exception e) {
            TeaException error = new TeaException(e.getMessage(), e);
            Common.assertAsString(error.message);
            return "发送失败";
        }
    }

    /**
     * 随机验证码
     */
    @Override
    public String randCategory() {
        String s = String.valueOf(System.currentTimeMillis());
        //依据当前时间的Hash值和一个随机单元产生一枚验证码
        return UUID.randomUUID().toString().replaceAll("[a-zA-Z]", "").replace("-", "").substring(0, 5) + s.charAt(s.length() - 1);
    }

    @Override
    public Boolean uploadFile(String filetreeName, String fileName, File file) {
        try {
            alyOssClient.putObject(bucketName, filetreeName + "/" + fileName, file);
            return true;
        } catch (OSSException ossException) {
            return false;
        }
    }

    @Override
    public File loadFile(String filetreeName, String fileName) {
        OSSObject object = alyOssClient.getObject(bucketName, filetreeName + "/" + fileName);
        try (InputStream inputStream = object.getObjectContent()) {
            byte[] bytes = new byte[1024 * 10];
            return null;
        } catch (IOException e) {
            LoggerFactory.getLogger(this.getClass()).warn("oss服务:文件获取异常");
            return null;
        }
    }
}
