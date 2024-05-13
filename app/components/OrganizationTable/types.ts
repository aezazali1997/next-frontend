export interface Address {
  city: string;
  country: string;
}

export interface Data {
  _id: string;
  title: string;
  bussinessEmail: string;
  ceo: string;
  bussinessPhone: string;
  createdAt: string;
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
    label: "Title",
    dataKey: "title",
  },
  {
    width: 200,
    label: "Email",
    dataKey: "bussinessEmail",
  },
  {
    width: 120,
    label: "Ceo",
    dataKey: "ceo",
  },
  {
    width: 120,
    label: "Contact",
    dataKey: "bussinessPhone",
  },
  {
    width: 120,
    label: "Registered Date",
    dataKey: "createdAt",
  },
];
