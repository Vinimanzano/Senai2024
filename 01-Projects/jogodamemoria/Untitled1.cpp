#include <iostream>
#include <stdlib.h>
#include <time.h>

using namespace std;

const int linha = 4, coluna = 3, pares = (linha * coluna) / 2;

int auxiliarPares = pares, linhaAle, colunaAle, pontuacao = 0, x1, x2, y1, y2;
char TABGAB[linha][coluna], TABSEC[linha][coluna], letra = 65;

void preencherTabuleiros() {
    srand(time(NULL));

    for (int i = 0; i < linha; i++) {
        for (int j = 0; j < coluna; j++) {
            TABGAB[i][j] = '0';
            TABSEC[i][j] = '*';
        }
    }

    while (auxiliarPares > 0) {
        for (int i = 0; i < 2; i++) {
            do {
                linhaAle = rand() % linha;
                colunaAle = rand() % coluna;
            } while (TABGAB[linhaAle][colunaAle] != '0');

            TABGAB[linhaAle][colunaAle] = letra;
        }
        letra++;
        auxiliarPares--;
    }
}

bool posicaoValida(int x, int y) {
    return x >= 0 && x < linha && y >= 0 && y < coluna;
}

void jogo() {
    while (pontuacao < pares) {
        cout << endl << "Pontuacao: " << pontuacao << endl << endl;

        cout << "  ";
        for (int i = 0; i < coluna; i++) {
            cout << i << " ";
        }
        cout << endl;

        for (int i = 0; i < linha; i++) {
            cout << i << " ";
            for (int j = 0; j < coluna; j++) {
                cout << TABSEC[i][j] << " ";
            }
            cout << endl;
        }

        do {
            cout << endl << "Selecione a primeira carta, digite a linha e coluna: ";
            cin >> x1 >> y1;
            cout << endl;

            if (!posicaoValida(x1, y1)) {
                cout << "Posicao invalida, tente novamente!" << endl;
                continue;
            }
            if (TABSEC[x1][y1] != '*') {
                cout << "Carta ja revelada, escolha novamente!" << endl;
            }

        } while (!posicaoValida(x1, y1) || TABSEC[x1][y1] != '*');

        TABSEC[x1][y1] = TABGAB[x1][y1];

        cout << "  ";
        for (int j = 0; j < coluna; j++) {
            cout << j << " ";
        }
        cout << endl;

        for (int i = 0; i < linha; i++) {
            cout << i << " ";
            for (int j = 0; j < coluna; j++) {
                cout << TABSEC[i][j] << " ";
            }
            cout << endl;
        }

        do {
            cout << endl << "Selecione a segunda carta, digite a linha e coluna: ";
            cin >> x2 >> y2;
            cout << endl;

            if (!posicaoValida(x2, y2)) {
                cout << "Posicao invalida, tente novamente!" << endl;
                continue;
            }
            if (TABSEC[x2][y2] != '*') {
                cout << "Carta ja revelada, escolha novamente!" << endl;
            }

        } while (!posicaoValida(x2, y2) || TABSEC[x2][y2] != '*');

        TABSEC[x2][y2] = TABGAB[x2][y2];

        cout << "  ";
        for (int j = 0; j < coluna; j++) {
            cout << j << " ";
        }
        cout << endl;

        for (int i = 0; i < linha; i++) {
            cout << i << " ";
            for (int j = 0; j < coluna; j++) {
                cout << TABSEC[i][j] << " ";
            }
            cout << endl;
        }

        if (TABSEC[x1][y1] != TABSEC[x2][y2]) {
            cout << endl << "Cartas diferentes, tente novamente!" << endl;
            TABSEC[x1][y1] = '*';
            TABSEC[x2][y2] = '*';
        } else {
            cout << endl << "Parabens, voce encontrou 1 par de cartas" << endl;
            pontuacao++;
        }
    }

    cout << endl << "Parabens, voce encontrou todos os pares!" << endl;
}

int main() {
    cout << "*" << endl;
    cout << "*" << endl;
    cout << "JOGO DA MEMORIA" << endl;
    cout << "*" << endl;
    cout << "*" << endl;

    preencherTabuleiros();
    jogo();

    return 0;
}

// Feito por Carlos Augusto Rodrigues.
