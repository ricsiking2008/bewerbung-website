#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <algorithm>
#define SIZE 8

using namespace std;

struct koor{
    int x = -1, y = -1; // x es y erteke
};

struct Babu{
    string color,type; //milye legyen a babunak
    int x_koor, y_koor;
    vector<koor> moves; //pair<int, int>
    
};
vector<Babu> babuk(32);//hany babu van
vector<vector<int>> board(SIZE, vector<int>(SIZE, -1));
int player = -1;


void init_board()
{
    /*
    MINTA:
    board[0][0]='B';
    HELYETT
    babuk[0]={"fekete","bastya",0,0,{{,}{,}{,}...}};
    */

    babuk[0]={"black","turm",0,0, {{0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {0, 6}, {0, 7}, {0, -7}, {0, -6}, {0, -5}, {0, -4}, {0, -3}, {0, -2}, {0, -1}, {-7, 0}, {-6, 0}, {-5, 0}, {-4, 0}, {-3, 0}, {-2, 0}, {-1, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0},}}; //szin, tipus, xkoor, ykoor, lepesek
    board[0][0] = 0;
    babuk[1]={"black","springer",0,1, {{-1, 2}, {2, 1}, {-2, -1}, {-1, -2}, {1, 2}, {2, 1}, {2, -1}, {1, -2},}};
    board[0][1] = 1;
    babuk[2]={"black","laufer",0,2, {{1, -1},{2, -2},{3, -3},{4, -4},{5, -5},{6, -6},{7, -7},{-1, 1}, {-2, 2}, {-3, 3}, {-4, 4}, {-5, 5}, {-6, 6}, {-7, 7}, {1, 1}, {2, 2}, {3, 3}, {4, 4}, {5, 5}, {6, 6}, {7, 7},{-1, -1},{-2, -2},{-3, -3},{-4, -4},{-5, -5},{-6, -6},{-7, -7},}};
    board[0][2] = 2;
    babuk[3]={"black","dame",0,3, {{1, -1},{2, -2},{3, -3},{4, -4},{5, -5},{6, -6},{7, -7},{-1, -1},{-2, -2},{-3, -3},{-4, -4},{-5, -5},{-6, -6},{-7, -7},{0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {0, 6}, {0, 7}, {0, -7}, {0, -6}, {0, -5}, {0, -4}, {0, -3}, {0, -2}, {0, -1}, {-7, 0}, {-6, 0}, {-5, 0}, {-4, 0}, {-3, 0}, {-2, 0}, {-1, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0}, {-1, 1}, {-2, 2}, {-3, 3}, {-4, 4}, {-5, 5}, {-6, 6}, {-7, 7}, {1, 1}, {2, 2}, {3, 3}, {4, 4}, {5, 5}, {6, 6}, {7, 7},}};
    board[0][3] = 3;
    babuk[4]={"black","konig",0,4, {{-1, -1}, {-1, 0}, {-1, 1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {0, -1},}};
    board[0][4] = 4;
    babuk[5]={"black","laufer",0,5, {{1, -1},{2, -2},{3, -3},{4, -4},{5, -5},{6, -6},{7, -7},{-1, -1},{-2, -2},{-3, -3},{-4, -4},{-5, -5},{-6, -6},{-7, -7},{-1, 1}, {-2, 2}, {-3, 3}, {-4, 4}, {-5, 5}, {-6, 6}, {-7, 7}, {1, 1}, {2, 2}, {3, 3}, {4, 4}, {5, 5}, {6, 6}, {7, 7},}};
    board[0][5] = 5;
    babuk[6]={"black","springer",0,6, {{-1, 2}, {2, 1}, {-2, -1}, {-1, -2}, {1, 2}, {2, 1}, {2, -1}, {1, -2},}};
    board[0][6] = 6;
    babuk[7]={"black","turm",0,7, {{0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {0, 6}, {0, 7}, {0, -7}, {0, -6}, {0, -5}, {0, -4}, {0, -3}, {0, -2}, {0, -1}, {-7, 0}, {-6, 0}, {-5, 0}, {-4, 0}, {-3, 0}, {-2, 0}, {-1, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0},}}; //szin, tipus, xkoor, ykoor, lepesek
    board[0][7] = 7;
    babuk[8]={"black","bauer",1,0,{}};
    board[1][0] = 8;
    babuk[9]={"black","bauer",1,1,{}};
    board[1][1] = 9;
    babuk[10]={"black","bauer",1,2,{}};
    board[1][2] = 10;
    babuk[11]={"black","bauer",1,3,{}};
    board[1][3] = 11;
    babuk[12]={"black","bauer",1,4,{}};
    board[1][4] = 12;
    babuk[13]={"black","bauer",1,5,{}};
    board[1][5] = 13;
    babuk[14]={"black","bauer",1,6,{}};
    board[1][6] = 14;
    babuk[15]={"black","bauer",1,7,{}};
    board[1][7] = 15;
   
   
    
    babuk[16]={"white","turm",7,0, {{0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {0, 6}, {0, 7}, {0, -7}, {0, -6}, {0, -5}, {0, -4}, {0, -3}, {0, -2}, {0, -1}, {-7, 0}, {-6, 0}, {-5, 0}, {-4, 0}, {-3, 0}, {-2, 0}, {-1, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0},}}; //szin, tipus, xkoor, ykoor, lepesek
    board[7][0] = 16;
    babuk[17]={"white","springer",7,1, {{-1, 2}, {2, 1}, {-2, -1}, {-1, -2}, {1, 2}, {2, 1}, {2, -1}, {1, -2},}};
    board[7][1] = 17;
    babuk[18]={"white","laufer",7,2, {{1, -1},{2, -2},{3, -3},{4, -4},{5, -5},{6, -6},{7, -7},{-1, -1},{-2, -2},{-3, -3},{-4, -4},{-5, -5},{-6, -6},{-7, -7},{-1, 1}, {-2, 2}, {-3, 3}, {-4, 4}, {-5, 5}, {-6, 6}, {-7, 7}, {1, 1}, {2, 2}, {3, 3}, {4, 4}, {5, 5}, {6, 6}, {7, 7},}};
    board[7][2] = 18;
    babuk[19]={"white","konig",7,3, {{-1, -1}, {-1, 0}, {-1, 1}, {1, -1}, {1, 0}, {1, 1}, {0, 1}, {0, -1},}};
    board[7][3] = 19;
    babuk[20]={"white","dame",7,4, {{1, -1},{2, -2},{3, -3},{4, -4},{5, -5},{6, -6},{7, -7},{-1, -1},{-2, -2},{-3, -3},{-4, -4},{-5, -5},{-6, -6},{-7, -7},{0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {0, 6}, {0, 7}, {0, -7}, {0, -6}, {0, -5}, {0, -4}, {0, -3}, {0, -2}, {0, -1}, {-7, 0}, {-6, 0}, {-5, 0}, {-4, 0}, {-3, 0}, {-2, 0}, {-1, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0}, {-1, 1}, {-2, 2}, {-3, 3}, {-4, 4}, {-5, 5}, {-6, 6}, {-7, 7}, {1, 1}, {2, 2}, {3, 3}, {4, 4}, {5, 5}, {6, 6}, {7, 7},}};
    board[7][4] = 20;
    babuk[21]={"white","laufer",7,5, {{1, -1},{2, -2},{3, -3},{4, -4},{5, -5},{6, -6},{7, -7},{-1, -1},{-2, -2},{-3, -3},{-4, -4},{-5, -5},{-6, -6},{-7, -7},{-1, 1}, {-2, 2}, {-3, 3}, {-4, 4}, {-5, 5}, {-6, 6}, {-7, 7}, {1, 1}, {2, 2}, {3, 3}, {4, 4}, {5, 5}, {6, 6}, {7, 7},}}; 
    board[7][5] = 21;
    babuk[22]={"white","springer",7,6, {{-1, 2}, {2, 1}, {-2, -1}, {-1, -2}, {1, 2}, {2, 1}, {2, -1}, {1, -2},}};
    board[7][6] = 22;
    babuk[23]={"white","turm",7,7, {{0, 1}, {0, 2}, {0, 3}, {0, 4}, {0, 5}, {0, 6}, {0, 7}, {0, -7}, {0, -6}, {0, -5}, {0, -4}, {0, -3}, {0, -2}, {0, -1}, {-7, 0}, {-6, 0}, {-5, 0}, {-4, 0}, {-3, 0}, {-2, 0}, {-1, 0}, {1, 0}, {2, 0}, {3, 0}, {4, 0}, {5, 0}, {6, 0}, {7, 0},}}; //szin, tipus, xkoor, ykoor, lepesek
    board[7][7] = 23;
    babuk[24]={"white","bauer",6,0,{}};
    board[6][0] = 24;
    babuk[25]={"white","bauer",6,1,{}};
    board[6][1] = 25;
    babuk[26]={"white","bauer",6,2,{}};
    board[6][2] = 26;
    babuk[27]={"white","bauer",6,3,{}};
    board[6][3] = 27;
    babuk[28]={"white","bauer",6,4,{}};
    board[6][4] = 28;
    babuk[29]={"white","bauer",6,5,{}};
    board[6][5] = 29;
    babuk[30]={"white","bauer",6,6,{}};
    board[6][6] = 30;
    babuk[31]={"white","bauer",6,7,{}};
    board[6][7] = 31;
    /*
    babuk[17] = fekete lo
    board[7][1] = 17
    board[7][6] = 17
    */
}

void index_board() //
{
    cout<<"\n\n";
    for(int i=0; i<SIZE; i++){
        for(int j=0; j<SIZE; j++){
            cout<<setw(3)<<board[i][j];
        }
        cout<<endl;
    }
}

void display_board() {
    cout << endl << endl;
    
    cout << "  ";
    for (char c = 'a'; c <= 'h'; ++c) {
        cout << "" << c << "  ";
    }
    cout << endl;

    for(int i = 0; i < SIZE; i++){
        cout << SIZE - i << " "; 

        for(int j = 0; j < SIZE; j++){
            if(board[i][j] == -1) cout << "#  "; 
            else{
                if(babuk[board[i][j]].color == "white"){
                    cout << "w";
                }
                if(babuk[board[i][j]].color == "black"){
                    cout << "b";
                }
                
                cout << char(toupper(babuk[board[i][j]].type[0])) << " "; 
            }
        }
        cout << endl;
    }
}



bool over()
{
    bool feketeVan = false;
    bool feherVan = false;

    for (int i = 0; i < 8; ++i) {
        for (int j = 0; j < 8; ++j) {
            if (board[i][j] == 4) { 
                feketeVan = true;
            } else if (board[i][j] == 19) { 
                feherVan = true;
            }
        }
    }

    if (feketeVan && feherVan) {
        return false;
    } else {
        if (!feherVan) {
            cout << "\nCheckmate Black won" << endl;
        } else if (!feketeVan) {
            cout << "\n Checkmate White Won" << endl;
        }
        return true;
    }
}




bool KnightMove(koor from, koor to){
    
    //atugorhat babukat
    //a mezo amelyikre lep kiuti az ott levo ellenfél babut
    
    for(int i=0; i < int(babuk[board[from.y][from.x]].moves.size()); i++){//vegigmegy az adott babu leheto lepesein
        for(int j=0; j<int(babuk[board[from.y][from.x]].moves.size()); j++){// megfelelo tipus legyen a kornyezetben
            if(from.x + babuk[board[from.y][from.x]].moves[i].x <8 && from.x + babuk[board[from.y][from.x]].moves[i].x >= 0){// hogy a bábu egy adott lépése az oszlopok érvényes reszeben van-e a játéktáblán, mielőtt végrehajtaná az adott lépést
                if(from.y + babuk[board[from.y][from.x]].moves[i].y <8 && from.y + babuk[board[from.y][from.x]].moves[i].y >= 0){//ugyanaz mint az elozo csak sorok es nem oszlopok
                    //a táblán vagy 

                    if(to.y== from.y + babuk[board[from.y][from.x]].moves[i].y && to.x == from.x + babuk[board[from.y][from.x]].moves[i].x){// egyezik-e a lépés a to koordinátákkal
                        if(board[to.y][to.x]== -1){
                            board[to.y][to.x] = board[from.y][from.x];
                            board[from.y][from.x] = -1;
                            return true;
                        }else if(babuk[board[to.y][to.x]].color != babuk[board[from.y][from.x]].color){
                            board[to.y][to.x] = board[from.y][to.x];
                            board[from.y][from.x] = -1;
                        
                            //break;
                            return true;
                        }
                    }
                }
                //from.x + babuk[board[from.y][from.x]].moves[i].x
                //from.y + babuk[board[from.y][from.x]].moves[i].y
            }
        }
    }
    return false;
}


bool PawnMove(koor from, koor to) {
    if ((from.y == 1 && player == 1 && to.y == 3) || (from.y == 6 && player == -1 && to.y == 4)) {
        if (to.x == from.x && board[to.y][to.x] == -1 && board[from.y + player][from.x] == -1) {
            board[to.y][to.x] = board[from.y][from.x];
            board[from.y][from.x] = -1;
            if (to.y == 0 || to.y == 7) {
                board[to.y][to.x] = (player == 1) ? 3 : 20;
            }
            return true;
        }
    }

    if (from.y + 1 * player != to.y) {
        return false;
    }

    if (to.x == from.x) {
        if (board[to.y][to.x] != -1) return false;
        board[to.y][to.x] = board[from.y][from.x];
        board[from.y][from.x] = -1;
        if (to.y == 0 || to.y == 7) {
            board[to.y][to.x] = (player == 1) ? 3 : 20;
        }
        return true;
    }

    if (from.x + 1 == to.x || from.x - 1 == to.x) {
        if (board[to.y][to.x] == -1) return false;
        if (babuk[board[to.y][to.x]].color != babuk[board[from.y][from.x]].color) {
            board[to.y][to.x] = board[from.y][from.x];
            board[from.y][from.x] = -1;
            if (to.y == 0 || to.y == 7) {
                board[to.y][to.x] = (player == 1) ? 3 : 20; 
            }
            return true;
        }
    }
    
    return false;
}




bool mindenMas(koor from, koor to){
    if(board[to.y][to.x] != -1 && babuk[board[to.y][to.x]].color == babuk[board[from.y][from.x]].color){
        return false;
    }
    bool valid = false;
    for(int i=0; i<int(babuk[board[from.y][from.x]].moves.size()); i++){//vegigmegy a babu lehetseges lepesein
        if(from.x + babuk[board[from.y][from.x]].moves[i].x < 8 && from.x + babuk[board[from.y][from.x]].moves[i].x >= 0){//elenorzi hogy korrekt tartomanyban van e az adott babu x koordinatajan
            if(from.y + babuk[board[from.y][from.x]].moves[i].y <8 && from.y + babuk[board[from.y][from.x]].moves[i].y >= 0){//ugyanaz mint az elozo csak y koordinatara
                //cout<<"Searched coordinates: "<<<<"   "from.x + babuk[board[from.y][from.x]].moves[i].x<<endl;
                if(to.x == from.x + babuk[board[from.y][from.x]].moves[i].x && to.y == from.y + babuk[board[from.y][from.x]].moves[i].y) valid = true; //talaltunk egy jo poziciot.
                
            }
        }
    }
    if(!valid) return false;
    
    int ydiff = from.y-to.y;
    int xdiff = from.x-to.x;
    
    for(int i=1; i < max(abs(ydiff),abs(xdiff)); i++){
        int kovix = from.x - (xdiff>0)*i - (xdiff<0)*-i;
        int koviy = from.y - (ydiff>0)*i - (ydiff<0)*-i;
        cout<<kovix<<" "<<koviy<<endl;
        if(board[koviy][kovix] != -1){
            return false;
        }
        
    }
    //siker volt
    board[to.y][to.x] = board[from.y][from.x];
    board[from.y][from.x] = -1;
    return true;
}




bool validMove(koor from, koor to) {
    if(board[from.y][from.x] == -1) return false;
  
    if (babuk[board[from.y][from.x]].type=="bauer") { 
        return PawnMove(from, to); 
    }
 
    else if (babuk[board[from.y][from.x]].type=="springer") {
        return KnightMove(from, to); 
    }
    else {
        return mindenMas(from, to); 
    }
}

void welcome(){
    cout<<"\nWelcome to" << "\n      _                   " <<
                            "\n  ___| |___  ___  ___ ___ " <<
                            "\n / __| '_  |/ _ |/ __| __|" <<
                            "\n |(__| | | || __/|__ /__ /" <<
                            "\n | __|_| |_||___||___/___/"<<endl;
}


int main()
{
    welcome();
    string name1;
    cout<<"Name of Player 1";
    cin>>name1;
    string name2;
    cout<<"Name of Player 2";
    cin>>name2;
    init_board();
    
    display_board();
   
    string mezo1, mezo2;
    koor from, to;
    while(!over()){
        string colorforplayer = "black";
        if(player == -1){
            colorforplayer = "white";
        }
        if(colorforplayer == "white"){
        cout<< name1 << " to move" << endl;
        }else{
            cout << name2 << " to move" << endl;
        }
       
        cout << "\nFrom where do you want to go? >> ";
        cin >> mezo1;
        cout << "\nWhere do you want to go? >> ";
        cin >> mezo2;

        from.y = 8 - (mezo1[1] - '0');
        from.x = mezo1[0] - 'a';
        to.y = 8 - (mezo2[1] - '0');
        to.x = mezo2[0] - 'a';
        while(babuk[board[from.y][from.x]].color != colorforplayer || !validMove(from, to)){
            cout<<"Invalid Move try again."<<endl;
            cout<< colorforplayer << " to move" << endl;
            cout << "\nFrom where do you want to go? >> ";
            cin >> mezo1;
            cout << "\nWhere do you want to go? >> ";
            cin >> mezo2;

            from.y = 8 - (mezo1[1] - '0');
            from.x = mezo1[0] - 'a';
            to.y = 8 - (mezo2[1] - '0');
            to.x = mezo2[0] - 'a';
        }
        display_board(); 
        player *= -1;
    }

    return 0;
       
   
}

   

/*
Ricsi notes:

A tabla kiirasa szamokkal, betukkel


Welcome resz, a lepesekhez koordinacio, cserelgesse a jatekost, irja ki a lepo jatekos szinet


Mikor tud lepni:
Van-e az utban babu
Azonos szinu babu utban van-e
Ne menjen le a palyarol: index > 7 v index < 0


Lepesmintaakt letrehozni, boardot, babukat feltolteni


lepesmintakat kiegesziteni
tabla feltoltese

to.y to.x ellenorzese, hogy helyes lepes-e a kijelolt lepesminta alapjan




*/



/*
# o # o #
o # # # o
# # x # #
o # # # o
# o # o #

y, x
{
{-1, +2}, 
-2, +1
-2, -1
+1, +2
+2, +1
+2, -1
+1, -2
-1, -2
}

# # # # # # # #
# # # # # # # #
# # # # # # # #
# # # # # # # #
# # # # # # # #
# # # # # # # #
# # # # # # # x
Bastya


https://prod.liveshare.vsengsaas.visualstudio.com/join?94D6012F22D879DF61E3E2A7474ABB2D471B

*/  
