#include <stdio.h>
#include <string.h>

#define BUF 20
char password[BUF];
int flag[] = {109, 103, 106, 108, 84, 98, 120, 84, 124, 100, 101, 111, 110, 121, 109, 126, 103, 84, 105, 98, 101, 106, 121, 114, 84, 127, 106, 120, 96};

int main() {
    puts("Enter the passwrd:");
    fgets(password, BUF, stdin);

    char xor = 0;
    for (int i = strlen(password) - 1; i >= 0; --i)
        xor ^= password[i];

    if (xor != 11) {
        puts("Invalid password :(");
        return 1;
    }

    for (int i = 0; i < sizeof(flag) / sizeof(int); ++i)
        printf("%c", (char)(flag[i] ^ xor));
    puts("");

    return 0;
}
