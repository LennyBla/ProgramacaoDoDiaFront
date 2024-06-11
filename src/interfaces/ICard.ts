import { Ikid } from './Ikid';
export interface ICard{
  id: number; // Autoincremento
  card: any;
  titulo: string;
  descricao: string;
  kids: Ikid[];
  }
  