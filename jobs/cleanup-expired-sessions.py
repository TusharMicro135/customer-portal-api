import os

import psycopg2


def cleanup_expired_sessions():
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
                cursor.execute("DELETE FROM sessions WHERE expires_at < NOW()")
    finally:
        connection.close()


if __name__ == "__main__":
    cleanup_expired_sessions()
