// eslint-disable-next-line no-undef
module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false,
    theme: {
        extend: {
            colors: {
                'primary-color': '#457BFF',
                'secondary-color': '#457BFF',
                'neutral-0': '#FFF',
                'neutral-100': '#E8E8E8',
                'neutral-1000': '#000',
                'neutral-400': '#A1A1A1',
                'neutral-500': '#616161',
                'neutral-600': '#474747',
                'neutral-200': '#D1D1D1',
                'white-01': 'rgba(0, 0, 0, 0.10)',
                'white-04': 'rgba(0, 0, 0, 0.40)',
                'white-06': 'rgba(0, 0, 0, 0.60)',
                'white-005': 'rgba(0, 0, 0, 0.05)',
                'red-color': '#CE0000',
                'red-color-1': '#FF0C15',
                'red-color-2': '#FF3D3D',
                'red-color-3': '#EB4D4D',
                'yellow-color': '#DDAF0C'
            }
        },
        screens: {
            'xsm': '280px',
            'ssm': '281px',
            'ssm2': '414px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
        }
    }
}
