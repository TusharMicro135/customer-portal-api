from unittest.mock import MagicMock, patch

import pytest
from reconcile import reconcile_payments

from worker import run_worker


def test_reconciliation_job_is_callable():
    assert callable(reconcile_payments)


@patch('reconcile.requests.get')
@patch('reconcile.psycopg2.connect')
def test_reconciles_queued_payments(connect, health_check):
    connection = MagicMock()
    cursor = connection.cursor.return_value.__enter__.return_value
    cursor.fetchall.return_value = [(7, 42), (8, 43)]
    connect.return_value = connection

    reconcile_payments()

    assert health_check.call_count == 2
    assert cursor.execute.call_count == 5
    connection.commit.assert_called_once_with()
    connection.close.assert_called_once_with()


@patch('reconcile.psycopg2.connect')
def test_closes_connection_when_query_fails(connect):
    connection = MagicMock()
    cursor = connection.cursor.return_value.__enter__.return_value
    cursor.execute.side_effect = RuntimeError('database unavailable')
    connect.return_value = connection

    try:
        reconcile_payments()
    except RuntimeError:
        pass

    connection.close.assert_called_once_with()


@patch('worker.time.sleep', side_effect=RuntimeError('stop loop'))
@patch('worker.schedule.run_pending')
@patch('worker.schedule.every')
def test_worker_registers_reconciliation_job(every, run_pending, _sleep):
    with pytest.raises(RuntimeError, match='stop loop'):
        run_worker()

    every.assert_called_once_with(30)
    every.return_value.seconds.do.assert_called_once_with(reconcile_payments)
    run_pending.assert_called_once_with()

