package senai.aula07.cors;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Permitir todas as rotas
                        .allowedOrigins("*") // Permitir todas as origens
                        .allowedMethods("*") // Permitir todos os métodos (GET, POST, PUT, DELETE, etc.)
                        .allowedHeaders("*"); // Permitir todos os cabeçalhos
            }
        };
    }
}
