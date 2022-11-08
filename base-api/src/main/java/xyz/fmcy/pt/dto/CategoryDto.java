package xyz.fmcy.pt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author 付高宏
 * @date 2022/11/3 11:16
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private Integer id;
    private String name;
    private Integer type;
    List<CategoryDto> children;
}
