declare module '@vercel/analytics/react' {
  import * as React from 'react';
  export const Analytics: React.ComponentType<any>;
}

declare module '@vercel/speed-insights/react' {
  import * as React from 'react';
  export const SpeedInsights: React.ComponentType<any>;
}
