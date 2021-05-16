package router

import (
	"github.com/Pauloo27/archvium/controllers/auth"
	"github.com/gofiber/fiber/v2"
)

var prefix = "/v1"

func RouteFor(app *fiber.App) {
	// Auth
	app.Post(prefix+"/auth/register", withPayload(new(auth.RegisterPayload)), auth.Register)
	app.Post(prefix+"/auth/login", withPayload(new(auth.LoginPayload)), auth.Login)
}
