import time
from flask import Flask
import os;
import psycopg;

def get_db_connection():
    conn = psycopg.connect(host='localhost',
                           dbname='flask_db',
                           user=os.environ['DB_USERNAME'],
                           password=os.environ['DB_PASSWORD'])
    return conn

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return{'time': time.time()}

@app.route('/api/books')
def get_books():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('select * from books;')
    books = cur.fetchall()
    cur.close()
    conn.close()
    return books