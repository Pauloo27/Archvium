package router

import (
	"github.com/Pauloo27/archvium/controllers/auth"
	"github.com/gofiber/fiber/v2"
)

var prefix = "/v1"

func RouteFor(app *fiber.App) {
	app.Post(prefix+"/auth", withPayload(new(auth.RegisterPayload)), auth.Register)
}
