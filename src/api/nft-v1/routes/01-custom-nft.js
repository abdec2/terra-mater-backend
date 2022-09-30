module.exports = {
    routes: [
      { // Path defined with a regular expression
        method: 'GET',
        path: '/nft-v1s/fwfilters', // Only match when the URL parameter is composed of lowercase letters
        handler: 'nft-v1.findWithFilters',
      }
    ]
  }
  