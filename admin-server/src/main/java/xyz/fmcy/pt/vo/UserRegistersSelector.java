package xyz.fmcy.pt.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.io.Serializable;

/**
 * @author 付高宏
 * @date 2022/11/8 10:13
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistersSelector implements Serializable {
    private long current;
    @Nullable
    private String phone;
}
