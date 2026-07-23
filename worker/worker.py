import time

import schedule

from reconcile import reconcile_payments


def consume_payment_queue():
    reconcile_payments()


schedule.every(30).seconds.do(consume_payment_queue)

if __name__ == "__main__":
    while True:
        schedule.run_pending()
        time.sleep(1)
