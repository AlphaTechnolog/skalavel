export interface IData {
  [key: string]: any;
}

export interface IDataRules {
  [key: string]: string;
}

export interface IValidationErrors {
  [key: string]: string[];
}

// export interface IValidator {
//   data: IData
//   rules: IDataRules
//   validationStatus: boolean
//   validationErrors: IValidationErrors
//   getSplittedRules(ruleString: string): string[]
//   validate(): void
//   ok(): boolean
//   getErrors(): IValidationErrors
// }
