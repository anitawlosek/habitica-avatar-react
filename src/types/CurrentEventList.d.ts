export interface CurrentEvent {
  aprilFools: string;
  start: string;
  end: string;
  [key: string]: string;
}

export type CurrentEventList = CurrentEvent[];