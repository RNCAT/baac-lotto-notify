FROM golang:1.16.4-alpine AS build
RUN mkdir /app
ADD . /app
WORKDIR /app
RUN go mod download
RUN go build -o main .
CMD ["/app/main"]