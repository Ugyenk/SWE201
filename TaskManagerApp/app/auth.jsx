// app/auth.jsx
// Authentication screen: toggle between Sign In and Sign Up

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform, StyleSheet, Alert,
} from 'react-native';
import { router } from 'expo-router';
import useAuth from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import { validateAuthForm } from '../utils/helpers';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '../utils/theme';
import InputField from '../components/InputField';
import Button from '../components/Button';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, register, loading, error, setError } = useAuth();

  const initialValues = isSignUp
    ? { name: '', email: '', password: '' }
    : { email: '', password: '' };

  const { values, errors, handleChange, handleBlur, validateAll, resetForm } = useForm(
    initialValues,
    (v) => validateAuthForm(v, isSignUp)
  );

  const handleSubmit = async () => {
    if (!validateAll()) return;
    let success = false;
    if (isSignUp) {
      success = await register(values.name, values.email, values.password);
    } else {
      success = await login(values.email, values.password);
    }
    if (success) {
      router.replace('/(tabs)/tasks');
    }
  };

  const toggleMode = () => {
    setIsSignUp((prev) => !prev);
    resetForm();
    setError(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logo}>✅</Text>
          <Text style={styles.appName}>TaskFlow</Text>
          <Text style={styles.tagline}>Stay organized, get things done.</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{isSignUp ? 'Create Account' : 'Welcome Back'}</Text>

          {/* API error */}
          {error ? <Text style={styles.apiError}>{error}</Text> : null}

          {isSignUp && (
            <InputField
              label="Full Name"
              value={values.name}
              onChangeText={(v) => handleChange('name', v)}
              onBlur={() => handleBlur('name')}
              placeholder="Jane Doe"
              error={errors.name}
            />
          )}
          <InputField
            label="Email"
            value={values.email}
            onChangeText={(v) => handleChange('email', v)}
            onBlur={() => handleBlur('email')}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <InputField
            label="Password"
            value={values.password}
            onChangeText={(v) => handleChange('password', v)}
            onBlur={() => handleBlur('password')}
            placeholder="At least 6 characters"
            secureTextEntry
            error={errors.password}
          />

          <Button
            title={isSignUp ? 'Sign Up' : 'Sign In'}
            onPress={handleSubmit}
            loading={loading}
            style={{ marginTop: SPACING.sm }}
          />
        </View>

        {/* Toggle */}
        <TouchableOpacity onPress={toggleMode} style={styles.toggle}>
          <Text style={styles.toggleText}>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <Text style={styles.toggleLink}>{isSignUp ? 'Sign In' : 'Sign Up'}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  header: { alignItems: 'center', marginBottom: SPACING.xl },
  logo: { fontSize: 56, marginBottom: SPACING.sm },
  appName: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  cardTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.lg,
  },
  apiError: {
    backgroundColor: '#FEF2F2',
    color: '#991B1B',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    fontSize: FONT_SIZE.sm,
  },
  toggle: { alignItems: 'center', marginTop: SPACING.lg },
  toggleText: { fontSize: FONT_SIZE.md, color: COLORS.textSecondary },
  toggleLink: { color: COLORS.primary, fontWeight: '700' },
});
