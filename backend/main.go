package main

import (
	"github.com/Pauloo27/archvium/logger"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load()
	logger.HandleFatal(err, "Where's the mf .env???")
}

func main() {
}
