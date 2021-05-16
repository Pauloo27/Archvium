package router

import (
	"github.com/Pauloo27/archvium/utils"
	jwt "github.com/form3tech-oss/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func isAuthed(c *fiber.Ctx) bool {
	return c.Locals("user") != nil
}

func withPayload(payload interface{}) fiber.Handler {
	return utils.ParseAndValidate(payload)
}

func requireAuth(c *fiber.Ctx) error {
	if isAuthed(c) {
		user := c.Locals("user").(*jwt.Token)
		claims := user.Claims.(jwt.MapClaims)
		c.Locals("user_name", claims["username"].(string))
		c.Locals("user_id", int(claims["id"].(float64)))
		return c.Next()
	}
	return utils.AsError(c, fiber.StatusUnauthorized, "Authentication is required")
}

func requireGuest(c *fiber.Ctx) error {
	if !isAuthed(c) {
		return c.Next()
	}
	return utils.AsError(c, fiber.StatusForbidden, "Being unauthenticated is required")
}
