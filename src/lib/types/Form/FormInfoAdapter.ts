// Rå data från API (adapter)
export type FormInfoAdapter = {
  action: string;
  method: string;
  inputs: {
    name: string;
    type: string;
  }[];
};

