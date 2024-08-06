import type { AppInfo } from '@/types/app'
export const APP_ID = `${process.env.NEXT_PUBLIC_APP_ID}`
export const API_KEY = `${process.env.NEXT_PUBLIC_APP_KEY}`
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`
export const APP_INFO: AppInfo = {
  title: 'GBFoods - Customer Immersion Insights Chatbot',
  description: 'Welcome! I\'m here to provide insights on consumer behavior and food product preferences in Ghana, focusing on cooking bases, aids, and condiments. My knowledge comes from 22 consumer immersions in Accra and Kumasi, covering both food vendors and household consumers. I can offer summaries, brand comparisons, and market trends across different consumer segments and product categories. Ask me anything, and I\'ll provide accurate, data-driven information based solely on these immersions to support your decision-making.',
  copyright: 'Kraz.ai',
  privacy_policy: '',
  default_language: 'en',
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
