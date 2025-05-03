package routes

import (
	"github.com/1001001010/AppleStory/server/controllers"
	"github.com/gin-gonic/gin"
)

func SetUpRoutes(r *gin.Engine) {
	auth := r.Group("/auth")
	{
		auth.POST("/register", controllers.Register)
	}
}
