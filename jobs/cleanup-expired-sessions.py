import os

import psycopg2


def cleanup_expired_sessions():
    connection = psycopg2.connect(
        host=os.getenv('PGHOST', 'localhost'),
        port=os.getenv('PGPORT', '5432'),
        dbname=os.getenv('PGDATABASE', 'customer_portal'),
        user=os.getenv('PGUSER', 'portal'),
        password=os.getenv('PGPASSWORD', 'dummy-local-password'),
    )
    try:
        with connection.cursor() as cursor:
            cursor.execute('DELETE FROM sessions WHERE expires_at < NOW()')
        connection.commit()
    finally:
        connection.close()


if __name__ == '__main__':
    cleanup_expired_sessions()
