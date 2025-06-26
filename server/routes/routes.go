package routes

import (
	"github.com/1001001010/AppleStory/server/controllers"
	"github.com/1001001010/AppleStory/server/middlewares"
	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {
	auth := router.Group("/auth")
	{
		auth.POST("/login", controllers.Login)
		auth.POST("/register", controllers.Register)
		auth.GET("/profile", middlewares.AuthMiddleware(), controllers.GetProfile)
	}
}
