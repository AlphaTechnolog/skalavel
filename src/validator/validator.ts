import {
  IData,
  IDataRules,
  IValidationErrors
} from './interfaces'

export class Validator {
  public data!: IData
  public rules!: IDataRules
  private validationStatus: boolean = true
  private validationErrors: IValidationErrors = {}

  constructor(data: IData, rules: IDataRules) {
    this.data = data
    this.rules = rules
    this.validate()
  }

  private getSplittedRules(valueRules: string): string[] {
    return valueRules.split('|')
  }

  public ok(): boolean {
    return this.validationStatus
  }

  public getErrors(): IValidationErrors {
    return this.validationErrors
  }

  public validate(): void {
    for (const [ruleKey, rule] of Object.entries(this.rules)) {
      const splittedRules = this.getSplittedRules(rule)
      if (this.data[ruleKey] === undefined && splittedRules.indexOf('required') !== -1) {
        // The data does not have the required rule
        this.validationStatus = false
        if (!this.validationErrors[ruleKey]) {
          this.validationErrors[ruleKey] = []
        }
        this.validationErrors[ruleKey].push(`${ruleKey} is required`)
        continue
      }
      for (const stringRule of splittedRules) {
        if (stringRule !== 'required' && stringRule !== 'nullable') {
          if (this.data[ruleKey] !== undefined) {
            let validator: any
            const splittedRule = stringRule.split(':')
            try {
              validator = require(`./rules/${splittedRule[0]}.rule`).default
            } catch (error) {
              throw new Error(`[VALIDATOR]: ${splittedRule[0]} validator not found`)
            }
            let argv: string[] = []
            if (splittedRule.length > 1) {
              argv = splittedRule[1].split(',').map(item => JSON.parse(item))
            }
            const validated: boolean = validator(this.data[ruleKey], ...argv)
            if (!validated) {
              this.validationStatus = false
              if (!this.validationErrors[ruleKey]) {
                this.validationErrors[ruleKey] = []
              }
              this.validationErrors[ruleKey].push(`${ruleKey} does not pass the test ${splittedRule[0]}`)
            }
          }
        }
      }
    }
  }
}
