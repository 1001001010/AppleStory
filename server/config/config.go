package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

var (
	DbHost     string
	DbPort     string
	DbUser     string
	DbPassword string
	DbName     string
	Port       string
)

func LoadEnvVariables() {
	// Загружаем данные из .env
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	DbHost = getEnv("DB_HOST", "localhost")
	DbPort = getEnv("DB_PORT", "3306")
	DbUser = getEnv("DB_USER", "root")
	DbPassword = getEnv("DB_PASSWORD", "")
	DbName = getEnv("DB_NAME", "mydb")
	Port = getEnv("PORT", "8080")
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

// Создаем подключение к базе данных
func GetDbConnection() string {
	return "mysql://" + DbUser + ":" + DbPassword + "@tcp(" + DbHost + ":" + DbPort + ")/" + DbName
}
