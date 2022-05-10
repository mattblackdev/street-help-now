import { ResourceTypeComponent } from '../resources/collection'
import { yobject, yoblean, yumber, yusring } from './yup'

const schemaTypeMap = {
  string: yusring,
  number: yumber,
  boolean: yoblean,
}

export function makeFormSchema(components: ResourceTypeComponent[] = []) {
  let schema = yobject({})

  for (const component of components) {
    let componentSchema = yobject({}).label(component.label)

    for (const { key, label, type, matches } of component.fields) {
      let fieldSchema = schemaTypeMap[type]().label(label)

      if (type === 'string' && matches) {
        // @ts-ignore
        fieldSchema = fieldSchema.matches(new RegExp(matches))
      }
      componentSchema = componentSchema.shape({ [key]: fieldSchema })
    }

    schema = schema.shape({ [component.key]: componentSchema })
  }
  return schema
}
