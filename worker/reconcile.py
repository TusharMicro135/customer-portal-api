import os

import psycopg2


def reconcile_payments():
    connection = psycopg2.connect(
        host=os.environ.get("PGHOST", "localhost"),
        port=os.environ.get("PGPORT", "5432"),
        dbname=os.environ.get("PGDATABASE", "customer_portal"),
        user=os.environ.get("PGUSER", "portal"),
        password=os.environ.get("PGPASSWORD", "dummy-local-password"),
    )
    try:
        with connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    """
                    SELECT id, customer_id
                    FROM payment_retries
                    WHERE status = 'pending'
                    ORDER BY created_at
                    FOR UPDATE SKIP LOCKED
                    LIMIT 50
                    """
                )
                for retry_id, customer_id in cursor.fetchall():
                    cursor.execute(
                        "UPDATE payment_retries SET status = 'paid', reconciled_at = NOW() WHERE id = %s",
                        (retry_id,),
                    )
                    cursor.execute(
                        "UPDATE customers SET payment_status = 'paid' WHERE id = %s",
                        (customer_id,),
                    )
    finally:
        connection.close()
