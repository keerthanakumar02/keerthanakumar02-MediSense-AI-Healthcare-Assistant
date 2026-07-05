import sqlite3
from pydantic import BaseModel


def create_table():

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS reports (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        extracted_text TEXT,
        analysis TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        age INTEGER,
        gender TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS medicine_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        medicine_name TEXT,
        generic_name TEXT,
        dosage TEXT,
        summary TEXT,
        ocr_text TEXT,
        scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    conn.commit()
    conn.close()


def save_report(filename, extracted_text, analysis):

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO reports (filename, extracted_text, analysis)
    VALUES (?, ?, ?)
    """, (filename, extracted_text, analysis))

    conn.commit()
    conn.close()


def get_reports():

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        id,
        filename,
        analysis
    FROM reports
    ORDER BY id DESC
    """)

    reports = cursor.fetchall()

    conn.close()

    return reports


class User(BaseModel):
    name: str
    email: str
    password: str
    age: int
    gender: str


class LoginUser(BaseModel):
    email: str
    password: str


def register_user(name, email, password, age, gender):

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO users (name, email, password, age, gender)
    VALUES (?, ?, ?, ?, ?)
    """, (name, email, password, age, gender))

    conn.commit()
    conn.close()


def login_user(email, password):

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    SELECT * FROM users
    WHERE email=? AND password=?
    """, (email, password))

    user = cursor.fetchone()

    conn.close()

    return user


def delete_report(report_id):

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM reports WHERE id=?",
        (report_id,)
    )

    conn.commit()
    conn.close()


# -----------------------------
# Medicine History
# -----------------------------

def save_medicine(
    medicine_name,
    generic_name,
    dosage,
    summary,
    ocr_text
):

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO medicine_history
    (
        medicine_name,
        generic_name,
        dosage,
        summary,
        ocr_text
    )
    VALUES (?, ?, ?, ?, ?)
    """,
    (
        medicine_name,
        generic_name,
        dosage,
        summary,
        ocr_text
    ))

    conn.commit()
    conn.close()


def get_medicine_history():

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("""
    SELECT
        id,
        medicine_name,
        generic_name,
        dosage,
        summary,
        scanned_at
    FROM medicine_history
    ORDER BY id DESC
    """)

    data = cursor.fetchall()

    conn.close()

    return data
def get_dashboard_stats():

    conn = sqlite3.connect("medisense.db")
    cursor = conn.cursor()

    cursor.execute("SELECT COUNT(*) FROM reports")
    reports = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM medicine_history")
    medicines = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM users")
    users = cursor.fetchone()[0]

    conn.close()

    return {
        "reports": reports,
        "medicines": medicines,
        "users": users
    }