export interface FlagContProperty {
  name: string;
  value_text?: string;
  value_bool?: boolean;
}

export interface FlagCont {
  name: string;
  properties: FlagContProperty[];
}
