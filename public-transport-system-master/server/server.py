from flask import Flask
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, jsonify
import json
import boto3
from boto3.dynamodb.conditions import Key,Attr
from time import gmtime, strftime
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
dynamodb=boto3.resource('dynamodb')
@app.route("/")
@cross_origin()
def hello_world():
    return 'Hello from Flask!'
@app.route('/verifylogin', methods=['POST','GET'])
@cross_origin()
def verify():
    print(request.data)
    table=dynamodb.Table('users')
    userid = request.form['userid']
    password = request.form['password']
    response=table.get_item(
	Key={
	    'userid': userid
	    }
	)
    item=response['Item']
    print(item)
    if (item['password']==password):
        return jsonify('{"Outcome": "'+'success'+'"}')
    else: 
        return jsonify('{"Outcome": "'+'error'+'"}')

@app.route('/newuser', methods=['POST','GET'])
@cross_origin()
def insert():
    print(request.data)
    table=dynamodb.Table('users')
    userid = request.form['userid']
    password = request.form['password']
    age = request.form['age']
    rfidtag = request.form['rfidtag']
    address = request.form['address']
    name = request.form['name']
    dynamodbTable=dynamodb.Table('users')
    try:
        dynamodbTable.put_item(
	    Item={
		'userid': userid,
	        'password': password,
		'age': age,
		'rfidtag':rfidtag,
		'address': address,
		'name':name
		}
	    )
    except Exception (e):
        print (e)
    return jsonify('{"Outcome": "'+'success'+'"}')
@app.route('/accountdetails', methods=['GET','POST'])
@cross_origin()
def userdetails():
    dynamodbTable=dynamodb.Table('users')
    response=dynamodbTable.get_item(
            Key={
	        'userid': "mridhu"
	        }
        
        )
    item=response['Item']
    return (json.dumps(item))
    return (item)
@app.route('/busroute', methods=['GET','POST'])
@cross_origin()
def busroute():
    dynamodbTable=dynamodb.Table('busroutes')
   
    response = dynamodbTable.scan()
    item=response
    print(item)
    return (json.dumps(item))
    return (item)
@app.route('/history', methods=['GET','POST'])
@cross_origin()
def his():
    dynamodbTable=dynamodb.Table('historytrans')
    response = dynamodbTable.scan()
    item=response
    print(item)
    return (json.dumps(item))
    return (item)
@app.route('/images', methods=['GET','POST'])
@cross_origin()
def imageretrival():
    dynamodbTable=dynamodb.Table('photostorage')
    response = dynamodbTable.scan()
    item=response
    print(item)
    return (json.dumps(item))
    return (item)	
@app.route('/addmoney', methods=['GET','POST'])
@cross_origin()
def addmoney():
    dynamodbTable=dynamodb.Table('rfid_balance')
    id = request.form['id']
    response=dynamodbTable.get_item(
            Key={
	        'id': id
	        }
        )
    item=response['Item']
    a=item['amount'];
    b=request.form['amount']
    c=int((round(a))+(round(b)))
    dynamodbTable.update_item(
    Key={
        'id': id
    },
    UpdateExpression="set amount = :r",
    ExpressionAttributeValues={
        ':r': c,
    },
    ReturnValues="UPDATED_NEW"
    )
    return (json.dumps(item))
    return (item)	
@app.route('/bustrack', methods=['GET','POST'])
@cross_origin()
def bustrack():
    dynamodbTable=dynamodb.Table('rfid_balance')
    id = "270012F05792"
    response=dynamodbTable.get_item(
            Key={
	        'id': id
	        }
        )
    item=response['Item']
    a=item['amount'];
    b=request.form['c']
    print(a)
    print(b)
    a=round(a)
    b=float(b)
    b=round(b)
    c=(int(a-b))
    c=round(c)
    print(c)
    dynamodbTable.update_item(
    Key={
        'id': id
    },
    UpdateExpression="set amount = :r",
    ExpressionAttributeValues={
        ':r': c,
    },
    ReturnValues="UPDATED_NEW"
    )
    table=dynamodb.Table('historytrans')
    
    dynamodbTable=dynamodb.Table('historytrans')
    t=strftime("%Y-%m-%d %H:%M:%S", gmtime())
    t=str(t)
    print(t)
    try:
        dynamodbTable.put_item(
	    Item={
		'dateandtime': t,
	    'x1': request.form['x1'],
		'y1': request.form['y1'],
		'x2': request.form['x2'],
		'y2': request.form['y2'],
		'cost':request.form['c'],
		'distance':request.form['d']
		}
	    )
    except Exception (e):
        print (e)
	
    return("hi")	
if __name__ == '__main__':
    app.debug=True
    app.run(host = '0.0.0.0',port=5000)

