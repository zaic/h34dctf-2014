#include <QImage>

int main() {
    QImage orig("original.png");
    QImage flag("flag.png");
    QImage task(orig.width(), orig.height(), QImage::Format_RGB32);

    for (int i = 0; i < orig.height(); ++i)
        for (int j = 0; j < orig.width(); ++j) {
            QRgb color = orig.pixel(j, i);
            int mask = 0xfefefe;
            if ((flag.pixel(j, i)&0xffffff) == 0)
                mask = 0xffffff;
            task.setPixel(j, i, color & mask);
        }
    task.save("task.png");

    return 0;
}
