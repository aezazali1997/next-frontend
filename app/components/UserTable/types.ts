export interface Address {
  city: string;
  country: string;
}

export interface Data {
  _id: string;
  name: string;
  email: string;
  addresses: Address[];
}

export interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width: number;
}

export const columns: ColumnData[] = [
  {
    width: 120,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "Email",
    dataKey: "email",
  },
  {
    width: 120,
    label: "City",
    dataKey: "city",
  },
  {
    width: 120,
    label: "Country",
    dataKey: "country",
  },
  {
    width: 200,
    label: "Actions",
    dataKey: "action",
  },
];
