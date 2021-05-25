package main

import (
	"github.com/Pauloo27/archvium/logger"
	"github.com/Pauloo27/archvium/router"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	jwtware "github.com/gofiber/jwt/v2"
	"github.com/joho/godotenv"
)

var port string

func init() {
	err := godotenv.Load()
	logger.HandleFatal(err, ".env not found, copy the .env.default one")

	port = utils.EnvString("PORT")
	logger.HandleFatal(err, "Web server port is invalid")
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: utils.EnvString("FRONTEND_URL"),
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	app.Use(jwtware.New(jwtware.Config{
		SigningKey: []byte(utils.EnvString("AUTH_JWT_SECRET")),
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			return c.Next()
		},
	}))

	router.RouteFor(app)

	logger.HandleFatal(db.Connect(
		utils.EnvString("DB_HOST"),
		utils.EnvString("DB_USER"),
		utils.EnvString("DB_PASSWORD"),
		"archvium",
		utils.EnvString("DB_PORT"),
	), "Cannot connect to db")

	db.Setup()

	app.Listen(utils.Fmt(":%s", port))
}
