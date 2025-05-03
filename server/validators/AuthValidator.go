// validators/register.go
package validators

import (
	"fmt"

	"github.com/1001001010/AppleStory/server/models"
	"gopkg.in/go-playground/validator.v9"
)

// Функция для валидации данных регистрации
func ValidateRegisterInput(input models.RegisterInput) error {
	// Инициализируем валидатор
	validate := validator.New()

	// Проверка на обязательность полей и их правильность
	err := validate.Struct(input)
	if err != nil {
		return fmt.Errorf("ошибка валидации: %s", err)
	}

	// Дополнительная логика для проверки совпадения паролей
	if input.Password != input.ConfirmPassword {
		return fmt.Errorf("пароли не совпадают")
	}

	return nil
}
