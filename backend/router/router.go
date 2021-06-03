package router

import (
	authController "github.com/Pauloo27/archvium/controllers/auth"
	filesController "github.com/Pauloo27/archvium/controllers/files"
	usersController "github.com/Pauloo27/archvium/controllers/users"
	"github.com/gofiber/fiber/v2"
)

func RouteFor(app *fiber.App) {

	v1 := app.Group("/v1")
	auth := v1.Group("/auth")
	users := v1.Group("/users")
	files := v1.Group("/files")

	auth.Post("/register",
		requireGuest,
		withEnvBool("AUTH_SELF_REGISTER"),
		withPayload(new(authController.RegisterPayload)),
		withPayloadNormalizer(authController.RegisterPayloadNormalizer),
		authController.Register,
	)
	auth.Post("/login",
		requireGuest,
		withPayload(new(authController.LoginPayload)),
		withPayloadNormalizer(authController.LoginPayloadNormalizer),
		authController.Login,
	)

	files.Post("/",
		requireAuth,
		withEnv("STORAGE_ROOT"),
		withEnvInt64("MAX_FILE_SIZE"),
		filesController.Upload,
	)

	files.Get("/:id", 
		requireAuth,
		withEnv("STORAGE_ROOT"),
		filesController.Download,
	)
	files.Delete("/:id", 
		requireAuth,
		withEnv("STORAGE_ROOT"),
		filesController.Delete,
	)

	users.Get("/@me", requireAuth, usersController.GetMe)
}
