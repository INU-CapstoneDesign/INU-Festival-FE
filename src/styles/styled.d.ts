import "styled-components";

import Theme from "./Theme";

declare module "styled-components" {
  export type DefaultTheme = Theme;
}
