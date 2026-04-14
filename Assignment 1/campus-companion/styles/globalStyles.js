import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const colors = {
  primary: '#2563eb',
  secondary: '#1e293b',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#0f172a',
  muted: '#64748b',
  border: '#e2e8f0',
  success: '#16a34a',
  danger: '#dc2626'
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: width * 0.05
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 10
  },

  subtitle: {
    fontSize: 18,
    color: colors.muted,
    marginBottom: 10
  },

  card: {
    backgroundColor: colors.card,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,

    // shadow (works on iOS + Android)
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 }
      },
      android: {
        elevation: 4
      }
    })
  },

  text: {
    fontSize: 16,
    color: colors.text
  },

  smallText: {
    fontSize: 14,
    color: colors.muted
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600'
  },

  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  }
});
