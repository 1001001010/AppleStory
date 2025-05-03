package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DbHost       string
	DbPort       string
	DbUser       string
	DbPassword   string
	DbName       string
	Port         string
	JwtSecretKey string
)

func LoadEnvVariables() {
	// Загружаем данные из .env
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	DbHost = getEnv("DB_HOST", "localhost")
	DbPort = getEnv("DB_PORT", "3306")
	DbUser = getEnv("DB_USER", "root")
	DbPassword = getEnv("DB_PASSWORD", "")
	DbName = getEnv("DB_NAME", "mydb")
	Port = getEnv("PORT", "8080")
	JwtSecretKey = getEnv("JWT_SECRET_KEY", "default-secret")
}

// Получаем значения с дефолтными значениями
func getEnv(key string, defaultValue string) string {
	if value, exist := os.LookupEnv(key); exist {
		return value
	}
	return defaultValue
}

// Получние порта
func GetPort() string {
	return Port
}

// Получние токена
func GetJwtSecretKey() string {
	return JwtSecretKey
}

// Создаем подключение к базе данных
func GetDbConnection() string {
	return "mysql://" + DbUser + ":" + DbPassword + "@tcp(" + DbHost + ":" + DbPort + ")/" + DbName
}
