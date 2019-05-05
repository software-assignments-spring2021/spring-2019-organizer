from datetime import datetime
from threading import Timer


def forever_one_second():
    x = datetime.today()
    y = x.replace(day=x.day, hour=x.hour, minute=x.minute, second=x.second+1, microsecond=x.microsecond)
    delta_t = y - x

    secs = delta_t.seconds + 1

    def hello_world():
        print("hello world")

    t = Timer(secs, hello_world)
    t.start()

def forever_oneday_start():
    x = datetime.today()
    oneday = 86400
    def hello_world():
        print("hello world")
    for i in range(10):
            t = Timer(86400*i, hello_world)
            t.start()


forever_oneday_start()