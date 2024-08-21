import { Transform } from 'class-transformer';

export function TransformToPositiveIntOrNull(): PropertyDecorator {
  return Transform(({ value }) => {
    value = Number(value);

    if (Number.isInteger(value) && value > 0) {
      return value;
    }

    return null;
  });
}
