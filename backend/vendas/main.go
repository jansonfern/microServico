// main.go (Golang com HTTP)
package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

var vendas []string

func registrarVenda(w http.ResponseWriter, r *http.Request) {
	var venda string
	err := json.NewDecoder(r.Body).Decode(&venda)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	vendas = append(vendas, venda)
	w.WriteHeader(http.StatusCreated)
	fmt.Fprintf(w, "Venda registrada: %s", venda)
}

func listarVendas(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(vendas)
}

func main() {
	http.HandleFunc("/vendas", registrarVenda)
	http.HandleFunc("/vendas/listar", listarVendas)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
