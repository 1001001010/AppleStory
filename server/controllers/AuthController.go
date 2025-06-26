package controllers

import (
	"net/http"

	"github.com/1001001010/AppleStory/server/models"
	"github.com/1001001010/AppleStory/server/services"
	"github.com/1001001010/AppleStory/server/validators"
	"github.com/gin-gonic/gin"
)

func Register(c *gin.Context) {
	var input models.RegisterInput

	// Привязываем входящие данные из JSON тела запроса к структуре input
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	// Валидация данных
	if err := validators.ValidateRegisterInput(input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, token, err := services.RegisterUser(input)
	if err != nil {
		// Если возникла ошибка в процессе регистрации, возвращаем ошибку
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Пользователь успешно зарегистрирован",
		"user":    user,
		"token":   token,
	})
}

func Login(c *gin.Context) {
	var input models.LoginInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input data"})
		return
	}

	user, token, err := services.LoginUser(input.Email, input.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Успешная авторизация",
		"user":    user,
		"token":   token,
	})
}

func GetProfile(c *gin.Context) {
	userID, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Пользователь не авторизован"})
		return
	}

	user, err := services.GetUserByID(userID.(uint))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Пользователь не найден"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": user})
}
