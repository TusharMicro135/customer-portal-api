from unittest.mock import MagicMock, patch

from reconcile import reconcile_payments


def test_reconciliation_job_is_callable():
    assert callable(reconcile_payments)


@patch('reconcile.requests.get')
@patch('reconcile.psycopg2.connect')
def test_reconciliation_updates_queued_payments(connect, get):
    connection = MagicMock()
    cursor = MagicMock()
    connection.cursor.return_value.__enter__.return_value = cursor
    cursor.fetchall.return_value = [(17, 42)]
    connect.return_value = connection

    reconcile_payments()

    get.assert_called_once_with('https://payments.example.invalid/health', timeout=2)
    assert cursor.execute.call_count == 3
    connection.commit.assert_called_once_with()
    connection.close.assert_called_once_with()
