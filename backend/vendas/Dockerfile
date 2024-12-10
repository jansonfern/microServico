# Dockerfile para o serviço de vendas
FROM golang:1.20

WORKDIR /app

COPY . .

RUN go mod init vendas
RUN go mod tidy

EXPOSE 8080

CMD ["go", "run", "main.go"]
