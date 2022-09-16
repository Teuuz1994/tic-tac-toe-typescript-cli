import { promisify } from 'util';
import Colors from 'colors';
import readline from 'readline';

import Props from './props';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = promisify(rl.question).bind(rl);

const total_moves = 9;

class Game extends Props {
  static init() {
    return new Game();
  }

  public play() {
    this.assign_row_and_column();
  };

  private exit_game() {
    process.exit();
  };

  private try_again() {
    this.reset_game();
    this.play();
  };

  private reset_game() {
    this.set_player = 1;
    this.set_moves = 0;
    this.set_row = '';
    this.set_column = '';
    this.set_user_win = false;
    this.set_cpu_win = false;
    this.set_table = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
  };

  async assign_row_and_column() {
    this.print_table();
    const row_answer = String(await question('Selecione uma linha: '));
    this.set_row = row_answer;
    const column_answer = String(await question('Selecione a coluna: '));
    this.set_column = column_answer;
    this.user_play();
  };

  private print_table() {
    console.log(`
            0:    1:     2:   \n
        0:  ${this.get_table[0][0]}   |  ${this.get_table[0][1]}  |  ${this.get_table[0][2]}  |   \n
        ----------------------
        1:  ${this.get_table[1][0]}   |  ${this.get_table[1][1]}  |  ${this.get_table[1][2]}  |   \n
        ----------------------
        2:  ${this.get_table[2][0]}   |  ${this.get_table[2][1]}  |  ${this.get_table[2][2]}  |   \n
        ----------------------\n
        Jogadas: ${Colors.green(String(this.get_moves))}\n
    `);
  };

  private async check_play_again_or_quit_game() {
    if (this.get_user_win) {
      return String(await question('Parabéns você venceu o game, deseja jogar novamente? (s) sim (n) não: ')).toLowerCase();
    }

    if (this.get_moves === 9) {
      return String(await question('Jogo empatado, deseja jogar novamente? (s) sim (n) não: ')).toLowerCase();
    }

    return String(await question('Não foi dessa vez :/ gostaria de tentar novamente? (s) sim (n) não: ')).toLowerCase();
  }

  private async finish_game() {
    const answer = await this.check_play_again_or_quit_game();

    if (answer !== 's' && answer !== 'n') {
      this.check_play_again_or_quit_game();
    }

    if (answer === 's') {
      return this.try_again();
    }

    return this.exit_game();
  }

  private check_is_possible_play() {
    if (this.get_moves < total_moves) {
      if (!this.get_user_win) {
        return true
      }

      if (!this.get_cpu_win) {
        return true
      }
    }

    return false;
  };

  private user_play() {
    if (this.check_is_possible_play()) {
      const converted_row = parseInt(this.get_row);
      const converted_column = parseInt(this.get_column);

      if (this.get_table[converted_row][converted_column] !== ' ') {
        console.log(`[${Colors.red('ERROR')}]Local já preenchido, tente um novo local!`);
        return this.assign_row_and_column();
      }

      const table_copy = this.get_table;
      table_copy[converted_row][converted_column] = 'X';
      this.set_table = table_copy;
      this.set_row = '';
      this.set_column = '';
      this.set_player = 2;
      this.set_moves = this.get_moves + 1;
      this.check_user_win();
    }

    this.finish_game();
  };

  private cpu_play() {
    if (this.check_is_possible_play()) {
      let random_row = Math.round(Math.random() * 2);
      let random_column = Math.round(Math.random() * 2);

      while (this.get_table[random_row][random_column] !== ' ') {
        random_row = Math.round(Math.random() * 2);
        random_column = Math.round(Math.random() * 2);
      }

      const table_copy = this.get_table;
      table_copy[random_row][random_column] = 'O';
      this.set_table = table_copy;
      this.set_player = 1;
      this.set_moves = this.get_moves + 1;
      this.check_cpu_win();
    }
  };

  private check_user_win() {
    switch (true) {
      case
        this.get_table[0][0] === 'X' &&
        this.get_table[1][0] === 'X' &&
        this.get_table[2][0] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[0][0] === 'X' &&
        this.get_table[1][1] === 'X' &&
        this.get_table[2][2] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[0][2] === 'X' &&
        this.get_table[1][1] === 'X' &&
        this.get_table[2][0] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[0][1] === 'X' &&
        this.get_table[1][1] === 'X' &&
        this.get_table[2][1] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[0][2] === 'X' &&
        this.get_table[1][2] === 'X' &&
        this.get_table[2][2] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[0][0] === 'X' &&
        this.get_table[0][1] === 'X' &&
        this.get_table[0][2] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[1][0] === 'X' &&
        this.get_table[1][1] === 'X' &&
        this.get_table[1][2] === 'X':
        this.set_user_win = true;
        break;

      case
        this.get_table[2][0] === 'X' &&
        this.get_table[2][1] === 'X' &&
        this.get_table[2][2] === 'X':
        this.set_user_win = true;
        break;

      default:
        this.cpu_play();
        break;
    }
  };

  private check_cpu_win() {
    switch (true) {
      case
        this.get_table[0][0] === 'O' &&
        this.get_table[1][0] === 'O' &&
        this.get_table[2][0] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[0][0] === 'O' &&
        this.get_table[1][1] === 'O' &&
        this.get_table[2][2] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[0][2] === 'O' &&
        this.get_table[1][1] === 'O' &&
        this.get_table[2][0] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[0][1] === 'O' &&
        this.get_table[1][1] === 'O' &&
        this.get_table[2][1] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[0][2] === 'O' &&
        this.get_table[1][2] === 'O' &&
        this.get_table[2][2] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[0][0] === 'O' &&
        this.get_table[0][1] === 'O' &&
        this.get_table[0][2] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[1][0] === 'O' &&
        this.get_table[1][1] === 'O' &&
        this.get_table[1][2] === 'O':
        this.set_cpu_win = true;
        break;

      case
        this.get_table[2][0] === 'O' &&
        this.get_table[2][1] === 'O' &&
        this.get_table[2][2] === 'O':
        this.set_cpu_win = true;
        break;

      default:
        this.assign_row_and_column();
        break;
    }
  };
}

Game.init().play();