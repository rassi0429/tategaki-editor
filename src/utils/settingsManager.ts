export interface EditorSettings {
  showPageBreak: boolean
}

const STORAGE_KEY = 'tategaki-editor-settings'

const defaultSettings: EditorSettings = {
  showPageBreak: true,
}

export const getSettings = (): EditorSettings => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return defaultSettings

  try {
    const settings = JSON.parse(stored)
    return { ...defaultSettings, ...settings }
  } catch {
    return defaultSettings
  }
}

export const saveSettings = (settings: EditorSettings): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
}

export const updateSettings = (
  updates: Partial<EditorSettings>
): EditorSettings => {
  const currentSettings = getSettings()
  const newSettings = { ...currentSettings, ...updates }
  saveSettings(newSettings)
  return newSettings
}
