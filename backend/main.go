package main

import (
	"os"
	"strconv"

	"github.com/Pauloo27/archvium/logger"
	"github.com/Pauloo27/archvium/router"
	"github.com/Pauloo27/archvium/services/db"
	"github.com/Pauloo27/archvium/utils"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

var port int

func init() {
	err := godotenv.Load()
	logger.HandleFatal(err, "Where's the mf .env???")

	port, err = strconv.Atoi(os.Getenv("ARCHVIUM_PORT"))
	logger.HandleFatal(err, "What's wrong with the mf port?")
}

func main() {
	app := fiber.New()

	router.RouteFor(app)

	logger.HandleFatal(db.Connect(
		os.Getenv("ARCHVIUM_DB_HOST"),
		os.Getenv("ARCHVIUM_DB_USER"),
		os.Getenv("ARCHVIUM_DB_PASSWORD"),
		"archvium",
		os.Getenv("ARCHVIUM_DB_PORT"),
	), "What's wrong with your db???")

	app.Listen(utils.Fmt(":%d", port))
}
