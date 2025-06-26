package main

import (
	"fmt"
	"log"

	"time"

	"github.com/1001001010/AppleStory/server/config"
	"github.com/1001001010/AppleStory/server/database"
	"github.com/1001001010/AppleStory/server/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	// Загружаем переменные окружения из .env
	config.LoadEnvVariables()

	// Подключение к базе данных и синхронизация
	if err := database.Connect(); err != nil {
		log.Fatalf("DB error: %v", err)
	}
	if err := database.Migrate(); err != nil {
		log.Fatalf("Migration error: %v", err)
	}
}

func main() {
	r := gin.Default()

	// Настройка прокси
	r.ForwardedByClientIP = true
	if err := r.SetTrustedProxies(nil); err != nil {
		log.Fatalf("Error setting trusted proxies: %v", err)
	}

	// Настройки CORS
	corsConfig := cors.Config{
		AllowOrigins:     []string{"http://localhost:8000", "http://localhost:3000", "http://192.168.0.147:3000", "http://83.99.161.62:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           24 * time.Hour,
	}

	r.Use(cors.New(corsConfig))

	// Настройка роутов
	routes.SetupRoutes(r)

	// Запуск сервера
	port := config.GetPort() // Получаем порт из конфигурации
	log.Printf("Starting server on port %s...", port)
	if err := r.Run(fmt.Sprintf(":%s", port)); err != nil {
		log.Fatalf("Error starting the server: %v", err)
	}
}
