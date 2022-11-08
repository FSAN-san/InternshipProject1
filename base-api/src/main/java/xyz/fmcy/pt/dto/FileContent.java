package xyz.fmcy.pt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/3 10:10
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileContent {
    private String name;
    private String context;
}
