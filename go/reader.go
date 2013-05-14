package main

import (
	"fmt"
	"io"
	"os"
	"strings"
)

func ReaderExample() {
FOREND:
	for {
		readerMenu()

		var ch string
		fmt.Scanln(&ch)
		var (
			data []byte
			err  error
		)
		switch strings.ToLower(ch) {
		case "1":
			fmt.Println("1111111111111111111111111111111111111：")
			data, err = ReadFrom(os.Stdin, 11)
		case "2":
			file, err := os.Open("/src/chapter01/io/01.txt")
			if err != nil {
				fmt.Println("222222222222222222222222222222:", err)
				continue
			}
			data, err = ReadFrom(file, 9)
			file.Close()
		case "3":
			data, err = ReadFrom(strings.NewReader("from string"), 12)
		case "4":
			fmt.Println("4444444444444！")
		case "b":
			fmt.Println("bbbbbbbbbbbbbbbbbbbbbbbb！")
			break FOREND
		case "q":
			fmt.Println("qqqqqqqqqqqqqqqqqqqqqqqq")
			os.Exit(0)
		default:
			fmt.Println("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
			continue
		}

		if err != nil {
			fmt.Println("ERROR！")
		} else {
			fmt.Printf(" data is : %s\n", data)
		}
	}
}

func ReadFrom(reader io.Reader, num int) ([]byte, error) {
	p := make([]byte, num)
	n, err := reader.Read(p)
	if n > 0 {
		return p[:n], nil
	}
	return p, err
}

func readerMenu() {
	fmt.Println("")
	fmt.Println("*******111*********")
	fmt.Println("*******please input :*********")
	fmt.Println("1 ")
	fmt.Println("2 ")
	fmt.Println("3 ")
	fmt.Println("4 ")
	fmt.Println("b ")
	fmt.Println("q ")
	fmt.Println("***********************************")
}

func main() {
	ReaderExample()
}
