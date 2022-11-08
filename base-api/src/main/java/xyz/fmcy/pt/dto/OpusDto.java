package xyz.fmcy.pt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author 付高宏
 * @date 2022/11/3 9:48
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OpusDto {
    private Integer id;
    private Integer authorId;
    private FileContent fileContent;
}
