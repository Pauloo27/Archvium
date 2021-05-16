package router

import (
	"github.com/Pauloo27/archvium/controllers/auth"
	"github.com/gofiber/fiber/v2"
)

var prefix = "/v1"

func RouteFor(app *fiber.App) {
	// Auth
	app.Post(prefix+"/auth/register", requireGuest, withPayload(new(auth.RegisterPayload)), auth.Register)
	app.Post(prefix+"/auth/login", requireGuest, withPayload(new(auth.LoginPayload)), auth.Login)

	// Test
	app.Get(prefix+"/hello", requireAuth, func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hello")
	})
	app.Get(prefix+"/hi", requireGuest, func(ctx *fiber.Ctx) error {
		return ctx.SendString("Hi")
	})
}
