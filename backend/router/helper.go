package router

import (
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
)

func withPayload(payload interface{}) fiber.Handler {
	return utils.ParseAndValidate(payload)
}
