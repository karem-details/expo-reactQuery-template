import React, { createContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import type { PropsWithChildren } from 'react';
import RNRestart from 'react-native-restart';
import { getDeviceLocale } from 'react-native-get-device-locale';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { getLocales } from 'expo-localization'; ---- Has a problem with RTL on iOS ----
import i18n from '@/locale/i18n';

type LanguageContextType = {
  language: string;
  changeLanguage: (lng: string) => Promise<void>;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  changeLanguage: async (v: string) => {},
});

export const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language);

  const checkSystemLanguage = async () => {
    const lang = await AsyncStorage.getItem('lang');
    if (lang) {
      changeLanguage(lang);
    } else {
      // Check system language
      const deviceLocale = await getDeviceLocale();
      changeLanguage(deviceLocale && deviceLocale.includes('ar') ? 'ar' : 'en');
    }
  };

  useEffect(() => {
    // Set initial RTL configuration
    checkSystemLanguage();
  }, []);

  const changeLanguage = async (lng: string) => {
    const oldLang = await AsyncStorage.getItem('lang');
    // Save state
    await AsyncStorage.setItem('lang', lng);
    // Change i18 language
    await i18n.changeLanguage(lng);
    let shouldBeRTL = lng === 'ar' ? true : false;
    // Update context state
    setLanguage(lng);
    if (shouldBeRTL !== I18nManager.isRTL) {
      I18nManager.forceRTL(shouldBeRTL);
      I18nManager.allowRTL(shouldBeRTL);
      return RNRestart.Restart();
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
