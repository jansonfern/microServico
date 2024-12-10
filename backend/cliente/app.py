# app.py (Python com Flask)
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://mongodb:27017/clientes"
mongo = PyMongo(app)

@app.route('/clientes', methods=['POST'])
def cadastrar_cliente():
    nome = request.json.get('nome')
    telefone = request.json.get('telefone')
    cliente = {"nome": nome, "telefone": telefone}
    mongo.db.clientes.insert_one(cliente)
    return jsonify(cliente), 201

@app.route('/clientes', methods=['GET'])
def listar_clientes():
    clientes = mongo.db.clientes.find()
    return jsonify([cliente for cliente in clientes])

if __name__ == '__main__':
    app.run(port=3002)
