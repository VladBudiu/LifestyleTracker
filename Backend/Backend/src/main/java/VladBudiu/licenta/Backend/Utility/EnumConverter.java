package VladBudiu.licenta.Backend.Utility;

import VladBudiu.licenta.Backend.model.diary.MealType;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class EnumConverter implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new Converter<String, MealType>() {
            @Override
            public MealType convert(String value) {
                return MealType.valueOf(value.toUpperCase());
            }
        });
    }
}
