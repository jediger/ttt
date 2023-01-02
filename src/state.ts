import TTT from './ttt-enum';

class TTTState {
  public state: TTT[][];
  public gridSize = 3;
  public lastTeamTurn: TTT | null;

  constructor() {
    this.state = this.blankState();
    this.lastTeamTurn = null;
  }

  private blankState(): TTT[][] {
    const row = Array(this.gridSize).fill(TTT.EMPTY);
    return Array(this.gridSize).fill([]).map(() => [...row]);
  }

  public resetState(): void {
    this.state = this.blankState();
    this.lastTeamTurn = null;
  }

  public changeGridSize(size: number): void {
    this.gridSize = size;
    this.resetState();
  }

  public validateCoordinates(x: number, y: number): void {
    if (x < 0 || y < 0 || x >= this.gridSize || y >= this.gridSize) throw new Error('Coordinates out of bounds');
  }

  public validateTeam(team: TTT): void {
    if (![TTT.X, TTT.O].includes(team)) throw new Error('Unknown team');
    if (team === this.lastTeamTurn) throw new Error('Out of turn!');
  }

  public setCell(x: number, y: number, team: TTT): void {
    this.validateCoordinates(x, y);
    this.validateTeam(team);
    if (this.state[x][y] !== TTT.EMPTY) throw new Error('Box already taken!');
    this.state[x][y] = team;
    this.lastTeamTurn = team;
  }
}

const stateInstance = new TTTState();

export default stateInstance;