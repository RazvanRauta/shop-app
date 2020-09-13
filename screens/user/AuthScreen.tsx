import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native'
import { RootStackScreenProps } from 'types'
import { Formik } from 'formik'
import { LinearGradient } from 'expo-linear-gradient'

import * as authActions from 'store/actions/auth'
import Input from 'components/common/Input'
import Colors from 'constants/Colors'
import { useDispatch } from 'react-redux'

interface Values {
  email: string
  password: string
}

interface Errors {
  email?: string
  password?: string
}

const AuthScreen: FunctionComponent<RootStackScreenProps> = () => {
  const [isSignUP, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isError) {
      //@ts-ignore
      Alert.alert('An error occurred!', isError, [{ text: 'Okay' }])
    }
  }, [isError])

  const handleAuth = useCallback(async (values: Values) => {
    let action
    if (isSignUP) {
      action = authActions.signUp(values.email, values.password)
    } else {
      action = authActions.signIn(values.email, values.password)
    }
    setIsLoading(true)
    setIsError(null)
    try {
      await dispatch(action)
    } catch (err) {
      setIsError(err.message)
      setIsLoading(false)
    }
  }, [])

  const validate = (values: Values) => {
    const errors: Errors = {}
    if (!values.email) {
      errors.email = 'Required'
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Required'
    } else if (values.password.length < 8) {
      errors.password = 'Minimum length of 8'
    }
    return errors
  }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={handleAuth}
        validate={validate}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
          values,
          touched,
          errors,
        }) => (
          <LinearGradient
            colors={['#ffedff', '#ffe3ff']}
            style={styles.gradient}
          >
            <View style={styles.card}>
              <ScrollView>
                <Input
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label={'Email'}
                  touched={touched.email}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Input
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  label={'Password'}
                  touched={touched.password}
                  error={errors.password}
                  keyboardType="default"
                  autoCapitalize="none"
                  secureTextEntry
                />
                <View style={styles.actions}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.primary} />
                  ) : (
                    <Button
                      color={Colors.primary}
                      title={!isSignUP ? 'Login' : 'Sign Up'}
                      //@ts-ignore
                      onPress={handleSubmit}
                    />
                  )}
                </View>
                <View style={styles.actions}>
                  <Button
                    color={Colors.accent}
                    title={`Switch to ${!isSignUP ? 'Sign Up' : 'Login'}`}
                    onPress={() => {
                      resetForm()
                      setIsSignUp((prev) => !prev)
                    }}
                  />
                </View>
              </ScrollView>
            </View>
          </LinearGradient>
        )}
      </Formik>
    </KeyboardAvoidingView>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    marginTop: 10,
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
})
