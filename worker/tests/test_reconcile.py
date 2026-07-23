from reconcile import reconcile_payments


def test_reconcile_smoke():
    assert callable(reconcile_payments)
