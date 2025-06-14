// Theme configuration for BTC Calculator
// This file contains all color variables and theme settings

export const lightTheme = {
  // Primary colors
  primary: '#1f2937',
  secondary: '#6b7280',
  accent: '#3b82f6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  // Backgrounds
  bgPrimary: '#ffffff',
  bgSecondary: '#f9fafb',
  bgTertiary: '#f3f4f6',
  bgAccent: '#f1f5f9',
  
  // Cards and containers
  cardBg: '#ffffff',
  cardBorder: '#e5e7eb',
  cardShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  
  // Inputs and forms
  inputBg: '#ffffff',
  inputBorder: '#d1d5db',
  inputBorderFocus: '#3b82f6',
  inputText: '#1f2937',
  inputPlaceholder: '#9ca3af',
  
  // Buttons
  btnPrimaryBg: '#3b82f6',
  btnPrimaryText: '#ffffff',
  btnPrimaryHover: '#2563eb',
  btnSecondaryBg: '#f3f4f6',
  btnSecondaryText: '#374151',
  btnSecondaryHover: '#e5e7eb',
  
  // Gradients
  gradientPrimary: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
  gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  gradientDanger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  gradientWarning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  gradientInfo: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  
  // Shadows
  shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  
  // Borders
  borderLight: '#e5e7eb',
  borderMedium: '#d1d5db',
  borderDark: '#9ca3af',
  
  // Text colors
  textPrimary: '#1f2937',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  textInverse: '#ffffff',
  
  // Status colors
  statusSuccess: '#10b981',
  statusError: '#ef4444',
  statusWarning: '#f59e0b',
  statusInfo: '#3b82f6',
  
  // Body and scrollbar
  bodyBg: '#ffffff',
  bodyColor: '#1f2937',
  scrollbarTrack: '#f1f5f9',
  scrollbarThumb: '#cbd5e1',
  scrollbarThumbHover: '#94a3b8'
};

export const darkTheme = {
  // Primary colors
  primary: '#e2e8f0',
  secondary: '#94a3b8',
  accent: '#3b82f6',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  
  // Backgrounds
  bgPrimary: '#1e293b',
  bgSecondary: '#334155',
  bgTertiary: '#475569',
  bgAccent: '#3b82f6',
  
  // Cards and containers
  cardBg: '#1e293b',
  cardBorder: '#475569',
  cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  
  // Inputs and forms
  inputBg: '#1e293b',
  inputBorder: '#475569',
  inputBorderFocus: '#3b82f6',
  inputText: '#e2e8f0',
  inputPlaceholder: '#64748b',
  
  // Buttons
  btnPrimaryBg: '#3b82f6',
  btnPrimaryText: '#ffffff',
  btnPrimaryHover: '#2563eb',
  btnSecondaryBg: '#475569',
  btnSecondaryText: '#e2e8f0',
  btnSecondaryHover: '#64748b',
  
  // Gradients
  gradientPrimary: 'linear-gradient(145deg, #3b82f6 0%, #1d4ed8 100%)',
  gradientSuccess: 'linear-gradient(135deg, #10b981 0%, #00cec9 100%)',
  gradientDanger: 'linear-gradient(135deg, #ef4444 0%, #c0392b 100%)',
  gradientWarning: 'linear-gradient(135deg, #f59e0b 0%, #e67e22 100%)',
  gradientInfo: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
  
  // Shadows
  shadowSm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  shadowMd: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  shadowLg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  shadowXl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  
  // Borders
  borderLight: '#475569',
  borderMedium: '#64748b',
  borderDark: '#94a3b8',
  
  // Text colors
  textPrimary: '#e2e8f0',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textInverse: '#1e293b',
  
  // Status colors
  statusSuccess: '#10b981',
  statusError: '#ef4444',
  statusWarning: '#f59e0b',
  statusInfo: '#3b82f6',
  
  // Body and scrollbar
  bodyBg: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
  bodyColor: '#e2e8f0',
  scrollbarTrack: '#1e293b',
  scrollbarThumb: '#475569',
  scrollbarThumbHover: '#64748b'
};

// Utility function to get theme colors
export const getThemeColors = (theme) => {
  return theme === 'light' ? lightTheme : darkTheme;
};

// Utility function to generate CSS variables
export const generateCSSVariables = (theme) => {
  const colors = getThemeColors(theme);
  return Object.entries(colors)
    .map(([key, value]) => `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
    .join('\n  ');
}; 