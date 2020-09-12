import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react'
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { Formik } from 'formik'

import { AdminScreenProps } from 'types'
import Input from 'components/common/Input'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from 'components/UI/HeaderButton'
import { isAndroid } from 'constants/Platform'
import * as productsActions from 'store/actions/products'
import Colors from 'constants/Colors'

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

const EditProductScreen: FunctionComponent<AdminScreenProps> = ({
  route,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setError] = useState(null)

  const prodId = route.params?.productId
  const dispatch = useDispatch()

  const editedProduct = useSelector((state: RootState) =>
    state.products.userProducts.find((prod) => prod.id === prodId)
  )

  useEffect(() => {
    if (isError) {
      Alert.alert('An error occurred!', isError ?? '', [{ text: 'Okay' }])
    }
  }, [isError])

  const submitHandler = useCallback(async (values: Values) => {
    setError(null)
    setIsLoading(true)
    try {
      if (editedProduct) {
        await dispatch(productsActions.updateProduct(values, editedProduct.id))
      } else {
        await dispatch(productsActions.createProduct(values))
      }
      navigation.goBack()
    } catch (err) {
      setError(err.message)
    }
    setIsLoading(false)
  }, [])

  const validate = (values: Values) => {
    const errors: Errors = {}
    if (!values.description) {
      errors.description = 'Required'
    } else if (values.description.length < 10) {
      errors.description = 'Minimum length of 10'
    }
    if (!values.title) {
      errors.title = 'Required'
    } else if (values.title.length < 3) {
      errors.title = 'Minimum length of 3'
    }
    if (!values.price) {
      errors.price = 'Required'
    } else if (!/^(?!,$)[\d,.]+$/.test(values.price)) {
      errors.price = 'Invalid Price'
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

  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )

  return (
    <ScrollView>
      <Formik
        initialValues={{
          title: editedProduct?.title ?? '',
          description: editedProduct?.description ?? '',
          price: `${editedProduct?.price ?? ''}`,
          imageUrl: editedProduct?.imageUrl ?? '',
        }}
        onSubmit={submitHandler}
        validate={validate}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          useLayoutEffect(() => {
            navigation.setOptions({
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={HeaderButton}>
                  <Item
                    title="Add"
                    iconName={isAndroid ? 'md-save' : 'ios-save'}
                    onPress={handleSubmit}
                  />
                </HeaderButtons>
              ),
            })
          })
          return (
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
            </View>
          )
        }}
      </Formik>
    </ScrollView>
  )
}

export default EditProductScreen

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    margin: 20,
  },
  message: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
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
