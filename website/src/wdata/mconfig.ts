export interface FlagContProperty {
  title: string;
  subtitle: string;
  value: boolean;
}

export interface FlagCont {
  name: string;
  properties: FlagContProperty[];
}
