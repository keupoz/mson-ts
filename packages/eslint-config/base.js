import keupoz from '@keupoz/eslint-config';

export default keupoz({
  react: true,
  tailwind: true,
  typescript: true,
  importsInternalPattern: ['@repo/**', '@demo/**', '@ui/**'],
}).append({
  ignores: ['**/shadcn/**'],
});
