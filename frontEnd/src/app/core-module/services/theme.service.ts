import { Injectable } from "@angular/core";
import { Theme, light, dark } from "../interfaces/theme.interface";


@Injectable({
    providedIn: 'root'
})
export class ThemeService{
    private active: Theme = light;
    private availableThemes: Theme[] = [light, dark];

    getAvailableThemes(): Theme[] {
        return this.availableThemes;
      }

      getActiveThemes(): Theme{
          return this.active;
      }
      isDarkTheme(): boolean {
        return this.active.name === dark.name;
      }
    
      setDarkTheme(): void {
        this.setActiveTheme(dark);
      }
      setLightTheme(): void {
        this.setActiveTheme(light);
      }
      
  setActiveTheme(theme: Theme): void {
    this.active = theme;

    Object.keys(this.active.properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        this.active.properties[property]
      );
    });
  }
}