import { createTamagui } from '@tamagui/core'
import { defaultConfig } from '@tamagui/config/v4'
import { themes } from './libs/themes' // <-- importe le thème généré

export const config = createTamagui({
  ...defaultConfig,
  themes, // <-- injecte ici ton thème perso
})

type CustomConfig = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends CustomConfig {}
}
