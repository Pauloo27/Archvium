package files

import (
	"github.com/gofiber/fiber/v2"
)

func Upload(c *fiber.Ctx) error {
	// TODO: target folder
	// TODO: validate Filename (check if it's contains only valid character)
	// TODO: handle path validation
	// TODO: size limit
	return c.SendString("dunno man, kinda insecure to let me implement...")
}
