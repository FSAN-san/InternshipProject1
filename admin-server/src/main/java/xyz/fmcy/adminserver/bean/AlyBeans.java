package xyz.fmcy.adminserver.bean;

import com.aliyun.dysmsapi20170525.Client;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.teaopenapi.models.Config;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author 付高宏
 * @date 2022/10/31 15:38
 */
@Configuration
public class AlyBeans {

    @Value("${aliyu.accessKeyId}")
    private String accessKeyId;
    @Value("${aliyu.accessKeySecret}")
    private String accessKeySecret;

    @Value("${aliyu.sms.url}")
    private String url;

    @Value("${aliyu.oss.endpoint}")
    private String endpoint;


    @Bean
    public Client alySmsClient() throws Exception {
        Config config = new Config()
                .setAccessKeyId(accessKeyId)
                .setAccessKeySecret(accessKeySecret);
        config.endpoint = url;
        return new Client(config);
    }

    @Bean
    public OSS alyOssClient(){
        return new OSSClientBuilder().build(endpoint,accessKeyId,accessKeySecret);
    }

}
