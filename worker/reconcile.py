import os

import psycopg2
import requests


def reconcile_payments():
    connection = psycopg2.connect(
        host=os.getenv('PGHOST', 'localhost'),
        port=os.getenv('PGPORT', '5432'),
        dbname=os.getenv('PGDATABASE', 'customer_portal'),
        user=os.getenv('PGUSER', 'portal'),
        password=os.getenv('PGPASSWORD', 'dummy-local-password'),
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, customer_id FROM payment_retries "
                "WHERE status = 'queued' ORDER BY id LIMIT 10 FOR UPDATE SKIP LOCKED"
            )
            for payment_id, customer_id in cursor.fetchall():
                requests.get('https://payments.example.invalid/health', timeout=2)
                cursor.execute(
                    "UPDATE payment_retries SET status = 'reconciled' WHERE id = %s",
                    (payment_id,),
                )
                cursor.execute(
                    "UPDATE customers SET payment_status = 'paid' WHERE id = %s",
                    (customer_id,),
                )
        connection.commit()
    finally:
        connection.close()
