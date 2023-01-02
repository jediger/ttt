import TTT from './ttt-enum';

class TTTChecker {
  private state: TTT[][];
  private gridSize = 3;

  constructor(state: TTT[][], gridSize: number) {
    this.state = state;
    this.gridSize = gridSize;
  }

  private checkRow(row: TTT[], team: TTT): boolean {
    return row.filter((c) => c === team).length === this.gridSize;
  }

  private checkRows(team: TTT): boolean {
    return this.state.some((row) => this.checkRow(row, team));
  }

  private checkCols(team: TTT): boolean {
    for (let i = 0; i < this.gridSize; i += 1) {
      if (this.state.filter((r) => r[i] === team).length === this.gridSize) return true;
    }
    return false;
  }

  private checkDiagonals(team: TTT): boolean {
    const s = this.state;
    const ltr = [];
    const rtl = [];
    for (let i = 0; i < this.gridSize; i += 1) {
      ltr.push(s[i][i]);
      rtl.push(s[i][this.gridSize - 1 - i]);
    }
    return ltr.filter((c) => c === team).length === this.gridSize || rtl.filter((c) => c === team).length === this.gridSize;
  }

  private checkTeam(team: TTT): boolean {
    return this.checkRows(team) || this.checkCols(team) || this.checkDiagonals(team);
  }

  private checkFull(): boolean {
    let filledCount = 0;
    this.state.forEach((row) => {
      row.forEach((cell) => {
        if (cell !== TTT.EMPTY) {
          filledCount += 1;
        }
      });
    });
    return filledCount === this.gridSize * this.gridSize;
  }

  public check(): { win: TTT | null; loss: boolean } {
    let win = this.checkTeam(TTT.X) ? TTT.X : null;
    win = this.checkTeam(TTT.O) ? TTT.O : win;
    return {
      win,
      loss: this.checkFull(),
    };
  }
}

export default TTTChecker;
