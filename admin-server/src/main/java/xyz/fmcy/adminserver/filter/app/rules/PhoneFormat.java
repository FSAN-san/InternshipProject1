package xyz.fmcy.adminserver.filter.app.rules;

import xyz.fmcy.adminserver.filter.annotation.AFormatRule;
import xyz.fmcy.adminserver.filter.format.FormatRule;

/**
 * @author 付高宏
 * @date 2022/11/7 16:00
 */
@AFormatRule("phone")
public class PhoneFormat implements FormatRule<String> {

    @Override
    public boolean examine(String data) {
        return data != null && data.matches("^1[0-9]{10}$");
    }

}
