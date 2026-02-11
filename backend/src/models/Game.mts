export class Game {
  id: number;
  title: string;
  played: boolean;

  constructor(id: number, title: string) {
    this.id = id;
    this.title = title;
    this.played = false;
  }
}
