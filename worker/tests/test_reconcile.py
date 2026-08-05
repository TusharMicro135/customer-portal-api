from reconcile import reconcile_payments


def test_reconciliation_job_is_callable():
    assert callable(reconcile_payments)
