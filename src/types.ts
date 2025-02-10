export interface BaseDocument {
  _id?: string;
  type: string;
  eventId: string;
  timestamp: number;
}

export interface Story extends BaseDocument {
  type: 'story';
  storyteller: string;
  status: 'pending' | 'judged';
}

export interface Judge extends BaseDocument {
  type: 'judge';
  teamName: string;
  status: 'active' | 'inactive';
}
