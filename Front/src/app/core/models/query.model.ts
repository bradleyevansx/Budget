export enum Comparator {
  Equals,
  DoesNotEqual,
  Contains,
  DoesNotContain,
  GreaterThan,
  GreaterThanOrEqualTo,
  LessThan,
  LessThanOrEqualTo,
}

export enum Operator {
  And,
  Or,
}

export interface QueryLayer<T> {
  operator: Operator;
  children: Query<T>[];
}

export interface Query<T, Property = keyof T> {
  comparator: Comparator;
  propertyName: Property;
  value: string | number | boolean | Date;
}
