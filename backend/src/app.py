from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/agendarApp'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.agendas

#crear solicitud de agenda
@app.route("/agendas", methods=["POST"])
def createAgenda():
    id = db.insert({
        'nombre': request.json['nombre'],
        'apellido_paterno': request.json['apellido_paterno'],
        'apellido_materno': request.json['apellido_materno'],
        'rut': request.json['rut'],
        'edad': request.json['edad'],
        'sexo': request.json['sexo'],
        'nombre_medico': request.json['nombre_medico'],
        'fecha': request.json['fecha'],
        'hora': request.json['hora'],
        'correo': request.json['correo'],
    })
    return jsonify({'id': str(ObjectId(id)), 'msg': "se ha agendado satisfactoriamente!"})

#ver Agendas
@app.route("/agendas", methods=["GET"])
def getAgendas():
    agendas = []
    for doc  in db.find():
        agendas.append({
            '_id': str(ObjectId(doc['_id'])),
            'nombre': doc['nombre'],
            'apellido_paterno': doc['apellido_paterno'],
            'apellido_materno': doc['apellido_materno'],
            'rut': doc['rut'],
            'edad': doc['edad'],
            'sexo': doc['sexo'],
            'nombre_medico': doc['nombre_medico'],
            'fecha': doc['fecha'],
            'hora': doc['hora'],
            'correo': doc['correo'],
        })
    return jsonify(agendas)

@app.route("/agenda/<id>", methods=["GET"])
def getAgenda(id):
    agenda = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(agenda['_id'])),
        'nombre': agenda['nombre'],
        'apellido_paterno': agenda['apellido_paterno'],
        'apellido_materno': agenda['apellido_materno'],
        'rut': agenda['rut'],
        'edad': agenda['edad'],
        'sexo': agenda['sexo'],
        'nombre_medico': agenda['nombre_medico'],
        'fecha': agenda['fecha'],
        'hora': agenda['hora'],
        'correo': agenda['correo'],
    })

@app.route("/agenda/<id>", methods=["DELETE"])
def deleteAgenda(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': "Agenda eliminada con exito"})

@app.route("/agenda/<id>", methods=["PUT"])
def updateAgenda(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'nombre': request.json['nombre'],
        'apellido_paterno': request.json['apellido_paterno'],
        'apellido_materno': request.json['apellido_materno'],
        'rut': request.json['rut'],
        'edad': request.json['edad'],
        'sexo': request.json['sexo'],
        'nombre_medico': request.json['nombre_medico'],
        'fecha': request.json['fecha'],
        'hora': request.json['hora'],
        'correo': request.json['correo'], 
    }})
    return jsonify({'msg': "Agenda actualizada con exito"})

if __name__ == '__main__':
    app.run(debug=True)