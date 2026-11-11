import { Injectable, signal } from '@angular/core';

export type SupportedLocale = 'en' | 'hi' | 'mr';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private currentLocaleSignal = signal<SupportedLocale>('en');
  readonly currentLocale = this.currentLocaleSignal.asReadonly();

  setLocale(locale: SupportedLocale) {
    this.currentLocaleSignal.set(locale);
    document.documentElement.lang = locale;
  }
}
