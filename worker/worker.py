import os
import time

import schedule

from reconcile import reconcile_payments


QUEUE_NAME = os.getenv('QUEUE_NAME', 'payment-reconciliation')


def run_worker():
    print(f'Consuming {QUEUE_NAME} reconciliation queue')
    schedule.every(30).seconds.do(reconcile_payments)
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == '__main__':
    run_worker()
