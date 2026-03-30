import { cookies } from "next/headers";
import { CustomThemeProvider, ThemeSettings } from "@/utils/theme/ThemeContext";
import './global.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const themeSettingsStr = cookieStore.get('theme_settings')?.value;
  const sysModeStr = cookieStore.get('system_mode')?.value;
  const initialSystemMode = (sysModeStr === 'dark' ? 'dark' : 'light') as 'light' | 'dark';
  
  let initialSettings: ThemeSettings = {
    themeMode: 'system',
    lightPrimaryColor: '#5D87FF',
    darkPrimaryColor: '#5D87FF',
    lightContrast: false,
    darkContrast: false,
  };

  if (themeSettingsStr) {
    try {
      initialSettings = JSON.parse(themeSettingsStr);
    } catch (e) {
      console.error("Error parsing theme settings cookie:", e);
    }
  }

  return (
    <html lang="en">
      <body>
        <CustomThemeProvider initialSettings={initialSettings} initialSystemMode={initialSystemMode}>
          {children}
        </CustomThemeProvider>
      </body>
    </html>
  );
}
