package utils

import "os"

func Env(name string) string {
	return os.Getenv("ARCHVIUM_" + name)
}
