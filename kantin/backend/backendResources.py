from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import reqparse, abort, Api, Resource, fields, marshal_with
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:purwandaru@localhost/kantin'
db = SQLAlchemy(app)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('id')
parser.add_argument('nama')
parser.add_argument('jenis')
parser.add_argument('harga', type=float, help='type harga harus number atau float')

resource_fields = {
    'id': fields.String,
    'nama': fields.String,
    'jenis': fields.String,
    'harga': fields.String
}


class MenuKantin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nama = db.Column(db.String(80), nullable=False)
    jenis = db.Column(db.String(120), nullable=False)
    harga = db.Column(db.Float(precision='50,4'), nullable=False)


class SaveAndUpdate(Resource):
    @marshal_with(resource_fields)
    def post(self):
        args = parser.parse_args()
        mk = MenuKantin()
        mk.nama=args['nama']
        mk.jenis=args['jenis']
        mk.harga=args['harga']
        db.session.add(mk)
        db.session.commit()
        return MenuKantin.query.all()
    @marshal_with(resource_fields)
    def put(self):
        args = parser.parse_args()
        db.session.query(MenuKantin).filter_by(id=args['id']).update({"nama": args['nama'],"jenis": args['jenis'],"harga": args['harga']})
        db.session.commit()
        return MenuKantin.query.all()

class GetAndDelete(Resource):
    @marshal_with(resource_fields)
    def get(self,theId):
        mk = MenuKantin.query.filter_by(id=theId).first()
        return mk
    @marshal_with(resource_fields)
    def delete(self,theId):
        mk = MenuKantin.query.filter_by(id=theId).first()
        db.session.delete(mk)
        db.session.commit()
        return MenuKantin.query.all()
    

class KantinGetAll(Resource):
    @marshal_with(resource_fields)
    def get(self):
        return MenuKantin.query.all()



api.add_resource(SaveAndUpdate, '/kantinCrud')
api.add_resource(GetAndDelete, '/kantinCrud/<theId>')

api.add_resource(KantinGetAll, '/getAll')


if __name__ == '__main__':
    ##app.run(debug=True)
    app.run(port="5002")