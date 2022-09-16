class Props {
  private player: number;

  private moves: number;

  private row: string;

  private column: string;

  private user_win: boolean;

  private cpu_win: boolean;

  private table: string[][];


  public get get_player(): number {
    return this.player;
  }

  public get get_moves(): number {
    return this.moves;
  }

  public get get_row(): string {
    return this.row;
  }

  public get get_column(): string {
    return this.column;
  }

  public get get_user_win(): boolean {
    return this.user_win;
  }

  public get get_cpu_win(): boolean {
    return this.cpu_win;
  }

  public get get_table(): string[][] {
    return this.table;
  }

  public set set_player(player: number) {
    this.player = player;
  }

  public set set_moves(moves: number) {
    this.moves = moves;
  }

  public set set_row(row: string) {
    this.row = row;
  }

  public set set_column(column: string) {
    this.column = column;
  }

  public set set_user_win(user_win: boolean) {
    this.user_win = user_win;
  }

  public set set_cpu_win(cpu_win: boolean) {
    this.cpu_win = cpu_win;
  }

  public set set_table(table: string[][]) {
    this.table = table;
  }


  constructor() {
    this.player = 1; // 1 = Player and 2 = CPU
    this.moves = 0;
    this.row = '';
    this.column = '';
    this.user_win = false;
    this.cpu_win = false;
    this.table = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
  }
}

export default Props;