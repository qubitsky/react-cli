import { useState, useCallback, useEffect, useMemo } from 'react'
import openSocket from 'socket.io-client'

import i18n from '../i18n'

const storageThemeName = 'darkTheme'
const storageLocaleName = 'locale'
const storageSelectedPathName = 'selectedPath'

const PORT = process.env.NODE_ENV === 'development' ? 8081 : 8080
const initSocket = openSocket(`http://localhost:${PORT}`)

const allLocales = [
  'en',
  'zh',
  'ru'
]

const nextLocaleMap: Record<string, string> = {};
for (let i = 0; i < allLocales.length; i++) {
  const locale = allLocales[i];
  const nextLocale = allLocales[(i + 1) % allLocales.length];
  nextLocaleMap[locale] = nextLocale;
}

export function useSettings () {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null)
  const [locale, setLocale] = useState<string | null>(null)
  const [selectedPath, setSelectedPath] = useState<string[]>([])

  useEffect(() => {
    const storedLocale = JSON.parse(localStorage.getItem(storageLocaleName)!) ?? 'en'
    const storedTheme = JSON.parse(localStorage.getItem(storageThemeName)!) ?? false
    const storedSelectedPath = JSON.parse(localStorage.getItem(storageSelectedPathName)!) ?? []
    setDarkTheme(storedTheme)
    setLocale(storedLocale)
    setSelectedPath(storedSelectedPath)
    i18n.changeLanguage(storedLocale)
  }, [])

  const changeTheme = useCallback(() => {
    localStorage.setItem(storageThemeName, JSON.stringify(!darkTheme))
    setDarkTheme(!darkTheme)
  }, [darkTheme])

  const changeLocale = useCallback(() => {
    const changedLocale = locale ? nextLocaleMap[locale] : allLocales[0];
    localStorage.setItem(storageLocaleName, JSON.stringify(changedLocale))
    setLocale(changedLocale)
    i18n.changeLanguage(changedLocale)
  }, [locale])

  const changeSelectedPath = useCallback((newPath) => {
    localStorage.setItem(storageSelectedPathName, JSON.stringify(newPath))
    setSelectedPath(newPath)
  }, [selectedPath])

  const socket = useMemo(() => initSocket, [])

  return {
    socket,
    locale,
    darkTheme,
    selectedPath,
    changeTheme,
    changeLocale,
    changeSelectedPath
  }
}
