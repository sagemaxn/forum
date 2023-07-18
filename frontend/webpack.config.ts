const config = {
    module: {
        rules: [
            {
                test: /\.(graphql|gql)$/,
                use: 'graphql-tag/loader',
                exclude: /node_modules/,
            },
        ],
    },
};

export default config;
