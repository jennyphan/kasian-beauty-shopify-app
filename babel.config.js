module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {},
        'transform-runtime': {},
        'styled-jsx': {},
        'class-properties': {}
      }
    ]
  ],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@components': './components'
        }
      }
    ]
  ]
};
