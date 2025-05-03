package middlewares

import (
	"net/http"
	"strings"

	"github.com/1001001010/AppleStory/server/config"
	"github.com/1001001010/AppleStory/server/services"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Токен не предоставлен"})
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		token, err := jwt.ParseWithClaims(tokenString, &services.Claims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(config.GetJwtSecretKey()), nil
		})

		if err != nil || !token.Valid {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Неверный токен: " + err.Error()})
			return
		}

		if claims, ok := token.Claims.(*services.Claims); ok {
			c.Set("user_id", claims.UserID)
		}

		c.Next()
	}
}
