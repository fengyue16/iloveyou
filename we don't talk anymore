import time
from threading import Thread, Lock
import sys

lock = Lock()


def animate_text(text, delay=0.1):
    with lock:
        for char in text:
            sys.stdout.write(char)
            sys.stdout.flush()
            time.sleep(delay)
        print()


def sing_lyric(lyric, delay, speed):
    time.sleep(delay)
    animate_text(lyric, speed)


def sing_song():
    lyrics = [
        ("\nDon't wanna know", 0.09),
        ("If you're looking into her eyes", 0.04),
        ("If he's holding onto you so tight", 0.04),
        ("The way I did before", 0.05),
        ("I overdosed", 0.2),
        ("Should've known your love was a game", 0.07),
        ("Now I can't get you out of my brain", 0.07),
        ("Oh, it's such a shame", 0.07),
        ("That we don't talk anymore", 0.07),
    ]
    delays = [0.5, 2.5, 5.4, 7.9, 10.0, 11.5, 14.5, 17.9, 19.6]

    threads = []
    for i in range(len(lyrics)):
        lyric, speed = lyrics[i]
        t = Thread(target=sing_lyric, args=(lyric, delays[i], speed))
        threads.append(t)
        t.start()

    for thread in threads:
        thread.join()


if __name__ == "__main__":
    sing_song()
