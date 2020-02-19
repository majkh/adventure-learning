module.exports = {
    devServer: { https: false, port: "44309" },
    css: {
        loaderOptions: {
            scss: {
                prependData: `@import "~@/scss/_variables.scss"; @import "~@/scss/_colors.scss";`
            },
        }
    }
}