module.exports = {
  env: {
  SUPABASE_URL: process.env.SUPABASE_URL
},
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
    ]
  },
}