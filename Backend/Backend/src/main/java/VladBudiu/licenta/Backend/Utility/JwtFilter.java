package VladBudiu.licenta.Backend.Utility;

import VladBudiu.licenta.Backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
@Profile("!test")
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Handle pre-flight CORS
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "*");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            return;
        }

        String path = request.getRequestURI();

        List<String> publicEndpoints = Arrays.asList(
                Constants.PulbicEndPoints.DEFAULT,
                Constants.PulbicEndPoints.LOGIN,
                Constants.PulbicEndPoints.SIGN_UP,
                Constants.PulbicEndPoints.CHANGE_PASSWORD,
                Constants.PulbicEndPoints.RESET_PASSWORD,
                Constants.PulbicEndPoints.GET_RESET_EMAIL,
                Constants.PulbicEndPoints.CONFIRMATION_CODE,
                Constants.PulbicEndPoints.ERROR,
                Constants.PulbicEndPoints.CREATE_ACCOUNT,
                Constants.PulbicEndPoints.REFRESH_TOKEN
        );

        if (publicEndpoints.contains(path)) {
            filterChain.doFilter(request, response);
            return;
        }


        String accessToken = getCookieValue(request, "access_token");
        System.out.println("acces token:" + accessToken);

        if (accessToken != null) {
            try {
                String userEmail = jwtUtil.validateAccessToken(accessToken);
                System.out.println("Valid token for user: " + userEmail);
                // You could optionally attach user details to request attributes here
                filterChain.doFilter(request, response);
            } catch (Exception e) {
                System.out.println("Invalid access token: " + e.getMessage());
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired token");
            }
        } else {
            System.out.println("No access token cookie found");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Access token missing");
        }
    }

    private String getCookieValue(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        Optional<Cookie> cookie = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals(name))
                .findFirst();
        return cookie.map(Cookie::getValue).orElse(null);
    }
}
