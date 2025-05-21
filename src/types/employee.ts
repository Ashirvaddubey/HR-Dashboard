
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  age: number;
  phone: string;
  address: {
    address: string;
    city: string;
    state: string;
  };
  company: {
    name: string;
    department: string;
    title: string;
  };
  performance?: {
    rating: number;
    projects: number;
    completionRate: number;
  };
}

export interface Department {
  name: string;
  employeeCount: number;
  averageRating: number;
}

export type FilterOptions = {
  search: string;
  department: string;
  minRating: number;
}
