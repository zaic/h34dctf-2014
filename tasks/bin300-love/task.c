// Компилятор, не ругайся
#include <stdio.h>
#include <string.h>

// IDA Pro - наше всё
char enc_flag[] = {0x0, 0x58, 0x53, 0x6b, 0x44, 0x1b, 0x9, 0x0, 0x71, 0x56, 0x0, 0x62, 0x17, 0x1f, 0x0, 0x52, 0x5c, 0x4f, 0x4a, 0x5c, 0x42, 0x21, 0x3e, 0x4f, 0x37, 0xa, 0x4f, 0x28, 0x4, 0x32, 0x4a, 0x5c};

// ELF 32-bit => copy/paste из Hex-Rays Decompiler'а
void mixer(char *short_buf)
{
  char v1; // ST0F_1@1

  v1 = *short_buf;
  *short_buf = short_buf[1];
  short_buf[1] = short_buf[2];
  short_buf[2] = short_buf[3];
  short_buf[3] = short_buf[4];
  short_buf[4] = short_buf[5];
  short_buf[5] = v1;
}

// from http://starwars.com/play/online-activities/crawl-creator/?cs=6fmxwqecq2 (ссылка в бинарном файле)
void real_mixer(char *short_buf) {
  asm("movzbl  3(%eax), %edx\n\t"
    "xorb    (%eax), %dl\n\t"
    "movb    %dl, 3(%eax)\n\t"
    "xorb    (%eax), %dl\n\t"
    "xorb    %dl, 3(%eax)\n\t"
    "movb    %dl, (%eax)\n\t"
    "movzbl  6(%eax), %edx\n\t"
    "xorb    1(%eax), %dl\n\t"
    "movb    %dl, 6(%eax)\n\t"
    "xorb    1(%eax), %dl\n\t"
    "xorb    %dl, 6(%eax)\n\t"
    "movb    %dl, 1(%eax)\n\t"
    "movzbl  7(%eax), %edx\n\t"
    "xorb    4(%eax), %dl\n\t"
    "movb    %dl, 7(%eax)\n\t"
    "xorb    4(%eax), %dl\n\t"
    "xorb    %dl, 7(%eax)\n\t"
    "movb    %dl, 4(%eax)\n\t"
    "movzbl  2(%eax), %edx\n\t"
    "xorb    5(%eax), %dl\n\t"
    "movb    %dl, 2(%eax)\n\t"
    "xorb    5(%eax), %dl\n\t"
    "xorb    %dl, 2(%eax)\n\t"
    "movb    %dl, 5(%eax)\n\t");
}

// Copy/paste псевдокод + меняем mixer на real_mixer
char * decrypt(char *buf, const char *key)
{
  unsigned int i; // [sp+20h] [bp-Ch]@1
  signed int j; // [sp+20h] [bp-Ch]@4
  signed int k; // [sp+20h] [bp-Ch]@7

  for ( i = 16; (signed int)i <= 31; ++i )
    buf[i] ^= key[i % strlen(key)];
  for ( j = 0; j <= 15; ++j )
    buf[j] ^= buf[j + 16];
  for ( k = 98; k >= 0; k -= 7 )
    real_mixer(&buf[k % 24]);
  return buf;
}

int main() {
  printf("%s\n", decrypt(enc_flag, "war"));

  return 0;
}
