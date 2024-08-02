import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const APP_INFO: AppInfo = {
  title: 'GBFoods - Ghana Customers Chatbot',
  description: 'Welcome! I\'m here to assist you with insights into consumer behavior and food product preferences in Ghana, particularly focusing on tomato paste and related products. My knowledge is derived from 22 detailed consumer interviews conducted in Accra and Kumasi. Whether you need concise summaries of consumer interviews, comparative analyses of tomato paste brands, or insights into market trends and consumer preferences, I\'m here to help. Feel free to ask any questions, and I\'ll provide you with accurate, relevant information to support your decision-making process.',
  copyright: 'Kraz.ai',
  privacy_policy: '',
  default_language: 'en',
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
