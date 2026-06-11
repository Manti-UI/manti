export const mantiUi = {
  name: 'Manti UI',
  packageName: '@manti-ui/react',
  framework: 'React',
  behaviorFoundation: 'Zag.js',
  status: 'design-system',
} as const;

export type MantiUiMetadata = typeof mantiUi;
