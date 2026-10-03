export interface Board {
  _id: string;
  name: string;
  userId: string;
}

export interface Column {
  _id: string;
  name: string;
  boardId: string;
  order: number;
}

export interface JobApplication {
  _id: string;
  boardId: string;
  columnId: string;
  company: string;
  position: string;
  order: number;
  location?: string;
  salary?: string;
  appliedDate?: string;
  tags?: string[];
  notes?: string;
  jobUrl?: string;
}
