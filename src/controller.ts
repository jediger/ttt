import State from './state';
import TTTChecker from './checker';
import TTT from './ttt-enum';

type TTTRequest = {
  x: number;
  y: number;
  team: TTT.X | TTT.O;
};

type TTTResponse = {
  state: TTT[][];
  win: TTT | null;
  loss: boolean;
};

class TTTController {
  static CurrentState(): TTTResponse {
    return {
      state: State.state,
      ...TTTChecker.Check(),
    };
  }

  static MakeMove(input: TTTRequest): TTTResponse {
    State.setCell(input.x, input.y, input.team);
    return TTTController.CurrentState();
  }

  static ResetBoard(): TTTResponse {
    State.resetState();
    return TTTController.CurrentState();
  }

  static ChangeBoardSize(size: number): TTTResponse {
    if (!(size > 0)) throw new Error('Invalid grid size');
    State.changeGridSize(size);
    return TTTController.CurrentState();
  }
}

export default TTTController;
