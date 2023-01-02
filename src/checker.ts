import TTT from './ttt-enum';
import State from './state';

class TTTChecker {

  private checkRow(row: TTT[], team: TTT): boolean {
    return row.filter((c) => c === team).length === State.gridSize;
  }

  private checkRows(team: TTT): boolean {
    return State.state.some((row) => this.checkRow(row, team));
  }

  private checkCols(team: TTT): boolean {
    for (let i = 0; i < State.gridSize; i += 1) {
      if (State.state.filter((r) => r[i] === team).length === State.gridSize) return true;
    }
    return false;
  }

  private checkDiagonals(team: TTT): boolean {
    const s = State.state;
    const ltr = [];
    const rtl = [];
    for (let i = 0; i < State.gridSize; i += 1) {
      ltr.push(s[i][i]);
      rtl.push(s[i][State.gridSize - 1 - i]);
    }
    return ltr.filter((c) => c === team).length === State.gridSize || rtl.filter((c) => c === team).length === State.gridSize;
  }

  private checkTeam(team: TTT): boolean {
    return this.checkRows(team) || this.checkCols(team) || this.checkDiagonals(team);
  }

  private checkFull(): boolean {
    let filledCount = 0;
    State.state.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== TTT.EMPTY) {
          filledCount += 1;
        }
      });
    });
    return filledCount === State.gridSize * State.gridSize;
  }

  public static Check(): { win: TTT | null; loss: boolean } {
    const checker = new TTTChecker();
    let win = checker.checkTeam(TTT.X) ? TTT.X : null;
    win = checker.checkTeam(TTT.O) ? TTT.O : win;
    return {
      win,
      loss: checker.checkFull(),
    };
  }
}

export default TTTChecker;
