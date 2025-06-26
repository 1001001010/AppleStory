package services

import (
	"fmt"
	"time"

	"github.com/1001001010/AppleStory/server/config"
	"github.com/1001001010/AppleStory/server/database"
	"github.com/1001001010/AppleStory/server/models"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type Claims struct {
	UserID uint `json:"user_id"`
	jwt.RegisteredClaims
}

func GenerateJWT(userID uint) (string, error) {
	claims := Claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(config.GetJwtSecretKey()))
}

func RegisterUser(input models.RegisterInput) (models.User, string, error) {
	var existingUser models.User
	if err := database.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		return models.User{}, "", fmt.Errorf("пользователь с таким email уже существует")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return models.User{}, "", fmt.Errorf("не удалось захэшировать пароль")
	}

	user := models.User{
		Name:     input.Name,
		Email:    input.Email,
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(&user).Error; err != nil {
		if err == gorm.ErrDuplicatedKey {
			return models.User{}, "", fmt.Errorf("пользователь с таким email уже существует")
		}
		return models.User{}, "", fmt.Errorf("не удалось создать пользователя")
	}

	token, nil := GenerateJWT(user.ID)
	if err != nil {
		return models.User{}, "", fmt.Errorf("не удалось создать токен")
	}
	return user, token, nil
}

func LoginUser(email, password string) (models.User, string, error) {
	var user models.User
	if err := database.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return models.User{}, "", fmt.Errorf("неверный email или пароль")
	}

	if !user.CheckPassword(password) {
		return models.User{}, "", fmt.Errorf("неверный email или пароль")
	}

	token, err := GenerateJWT(user.ID)
	if err != nil {
		return models.User{}, "", fmt.Errorf("не удалось создать токен")
	}

	return user, token, nil
}

func GetUserByID(userID uint) (models.User, error) {
	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		return models.User{}, fmt.Errorf("пользователь не найден")
	}
	return user, nil
}
