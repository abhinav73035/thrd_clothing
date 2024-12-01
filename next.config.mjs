/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
          delimiter: ',',
          transform: (value) => {
            // Convert price strings to numbers
            if (!isNaN(value) && value !== '') {
              return Number(value);
            }
            return value;
          }
        }
      });
      return config;
    },
    images: {
      domains: ['via.placeholder.com','th.bing.com'],
    },
    typescript: {
      ignoreBuildErrors: true
    }
  };
  
  export default nextConfig;