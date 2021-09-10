package ru.example.hello.world.config;

import lombok.val;
import com.nimbusds.jose.shaded.json.JSONArray;
import com.nimbusds.jose.shaded.json.JSONObject;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class WebSecurityConfiguration {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                .authorizeExchange(authorizeRequests -> authorizeRequests
                        .pathMatchers("/").permitAll()
                        .pathMatchers("/static/webjars/app-bundle.js").permitAll()
                        .pathMatchers("/static/webjars/app-bundle.js.map").permitAll()
                        .pathMatchers("/rest/hello/world").authenticated())
                .oauth2ResourceServer(resourceServerConfigurer -> resourceServerConfigurer
                        .jwt(jwtConfigurer -> jwtConfigurer
                                .jwtAuthenticationConverter(jwtAuthenticationConverter())))
                .httpBasic().disable()
                .formLogin().disable()
                .csrf().disable()
                .logout().disable();

        return http.build();
    }

    @Bean
    public Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        val jwtAuthenticationConverter = new ReactiveJwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter());
        return jwtAuthenticationConverter;
    }

    @Bean
    public Converter<Jwt, Flux<GrantedAuthority>> jwtGrantedAuthoritiesConverter() {
        val delegate = new JwtGrantedAuthoritiesConverter();

        return new Converter<Jwt, Flux<GrantedAuthority>>() {
            @Override
            public Flux<GrantedAuthority> convert(Jwt jwt) {
                val grantedAuthorities = delegate.convert(jwt);

                if (jwt.getClaim("realm_access") == null) {
                    return Flux.fromIterable(grantedAuthorities);
                }
                JSONObject realmAccess = jwt.getClaim("realm_access");
                if (realmAccess.get("roles") == null) {
                    return Flux.fromIterable(grantedAuthorities);
                }
                val roles = (JSONArray) realmAccess.get("roles");

                val keycloakAuthorities = roles
                        .stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                        .collect(Collectors.toList());

                grantedAuthorities.addAll(keycloakAuthorities);

                return Flux.fromIterable(grantedAuthorities);
            }
        };
    }
}