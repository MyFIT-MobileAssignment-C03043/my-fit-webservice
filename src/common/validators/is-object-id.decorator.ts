import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { Types } from 'mongoose';

/**
 * Custom decorator để kiểm tra chuỗi có phải là MongoDB ObjectId hợp lệ không.
 */
export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectId',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments): boolean {
          return typeof value === 'string' && Types.ObjectId.isValid(value);
        },
        defaultMessage(_args: ValidationArguments): string {
          return `${_args.property} phải là ObjectId hợp lệ`;
        },
      },
    });
  };
}
