import React, { FunctionComponent } from 'react'
import { StyleSheet, ScrollView, View, Button } from 'react-native'
import { Formik } from 'formik'

import { AdminScreenProps } from 'types'
import Input from 'components/common/Input'
import Colors from 'constants/Colors'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

export interface Values {
  description: string
  title: string
  price: string
  imageUrl: string
}

interface Errors {
  description?: string
  title?: string
  price?: string
  imageUrl?: string
}

const EditProductScreen: FunctionComponent<AdminScreenProps> = ({ route }) => {
  const prodId = route.params?.productId
  const submit = route.params?.submit

  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )

  const handleSubmit = (values: Values) => {
    //@ts-ignore
    submit(values, prodId)
  }

  const validate = (values: Values) => {
    const errors: Errors = {}
    if (!values.description) {
      errors.description = 'Required'
    } else if (values.description.length < 10) {
      errors.description = 'Minimun length of 10'
    }
    if (!values.title) {
      errors.title = 'Required'
    } else if (values.title.length < 3) {
      errors.title = 'Minimun length of 3'
    }
    if (!values.price) {
      errors.price = 'Required'
    } else if (!/^(?!,$)[\d,.]+$/.test(values.price)) {
      errors.price = 'Invalid Price'
      //@ts-ignore
    } else if (/0/.test(parseInt(values.price))) {
      errors.price = "Can't be 0"
    }

    if (!values.imageUrl) {
      errors.imageUrl = 'Required'
    } else if (
      !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
        values.imageUrl
      )
    ) {
      errors.imageUrl = 'Invalid url address'
    }
    return errors
  }
  return (
    <ScrollView>
      <Formik
        initialValues={{
          title: editedProduct?.title ?? '',
          description: editedProduct?.description ?? '',
          price: `${editedProduct?.price ?? ''}`,
          imageUrl: editedProduct?.imageUrl ?? '',
        }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <View style={styles.form}>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              label={'Title'}
              touched={touched.title}
              error={errors.title}
            />
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              label={'Description'}
              touched={touched.description}
              error={errors.description}
            />
            {!editedProduct ? (
              <Input
                containerStyle={styles.inputContainer}
                inputStyle={styles.input}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                keyboardType="numeric"
                label={'Price'}
                touched={touched.price}
                error={errors.price}
              />
            ) : null}
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              onChangeText={handleChange('imageUrl')}
              onBlur={handleBlur('imageUrl')}
              value={values.imageUrl}
              label={'ImageUrl'}
              touched={touched.imageUrl}
              error={errors.imageUrl}
            />
            <View style={styles.submit}>
              <Button
                //@ts-ignore
                onPress={handleSubmit}
                title="Submit"
                color={Colors.primary}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  )
}

export default EditProductScreen

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 20,
  },
})
