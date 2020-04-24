module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript', 'next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './components',
        },
      },
    ],
  ],
};
