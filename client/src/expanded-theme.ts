import {Palette, PaletteColor} from "@mui/material/styles/createPalette"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type _FixTS = Palette | PaletteColor;

 declare module "@mui/material/styles/createPalette" {
    interface PaletteColor {
        [key: number] : string;
    }
    interface Palette {
        tertiary: PaletteColor;
    }
 }