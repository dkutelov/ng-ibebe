export interface Toaster {
  type: ToasterType;
  message: string;
  autoClose: boolean;
}

export enum ToasterType {
  Success,
  Error,
}
