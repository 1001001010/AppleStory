package database

import "github.com/1001001010/AppleStory/server/models"

func Migrate() error {
	return DB.AutoMigrate(&models.User{})
}
