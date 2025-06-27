package VladBudiu.licenta.Backend.Utility;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JWTUtil {

    private final String accessSecret = "your-very-long-access-secret-key-change-this"; // min 256 bits (32+ chars)
    private final String refreshSecret = "your-very-long-refresh-secret-key-change-this"; // min 256 bits

    public String generateAccessToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000)) // 10 mins
                .signWith(getSigningKey(accessSecret), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7L * 24 * 60 * 60 * 1000)) // 7 days
                .signWith(getSigningKey(refreshSecret), SignatureAlgorithm.HS256)
                .compact();
    }

    public String validateAccessToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey(accessSecret))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String validateRefreshToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey(refreshSecret))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public String extractEmailFromAccessToken(String token) {
        return Jwts.parser()
                .setSigningKey(getSigningKey(accessSecret))
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    private Key getSigningKey(String secret) {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
