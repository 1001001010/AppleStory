package models

import (
	"fmt"
)

// Структура для регистрации пользователя
type RegisterInput struct {
	Name            string `json:"name" binding:"required,min=3"`
	Email           string `json:"email" binding:"required,email"`
	Password        string `json:"password" binding:"required,min=6"`
	ConfirmPassword string `json:"confirmPassword" binding:"required"`
}

// Валидация структуры
func (r *RegisterInput) Validate() error {
	// Проверка совпадения паролей
	if r.Password != r.ConfirmPassword {
		return fmt.Errorf("пароли не совпадают")
	}

	return nil
}
