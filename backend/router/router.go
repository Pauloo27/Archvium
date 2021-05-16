package router

import "github.com/gofiber/fiber/v2"

func RouteFor(app *fiber.App) {
	app.Get("/", func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hello 🎉")
	})
}
